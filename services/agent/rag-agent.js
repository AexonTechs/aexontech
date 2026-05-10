import 'dotenv/config';
import OpenAI from 'openai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import pg from 'pg';
import { SYSTEM_PROMPT } from '../prompts/system-prompt.js';
import { NVIDIAEmbeddings } from '../utils/nvidia-embeddings.js';

const { Pool } = pg;

// Initialize PostgreSQL connection pool (shared across requests)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize OpenAI client for NVIDIA NIM DeepSeek
const llmClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1'
});

// Initialize embeddings model for NVIDIA NIM with custom class
const embeddings = new NVIDIAEmbeddings({
  apiKey: process.env.NVIDIA_API_KEY,
  model: 'nvidia/nv-embedqa-e5-v5'
});

// Initialize PGVectorStore (lazy initialization)
let vectorStore = null;

async function getVectorStore() {
  if (!vectorStore) {
    vectorStore = await PGVectorStore.initialize(embeddings, {
      postgresConnectionOptions: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      },
      tableName: 'kb_documents',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'embedding',
        contentColumnName: 'content',
        metadataColumnName: 'metadata'
      }
    });
  }
  return vectorStore;
}

/**
 * Run the RAG agent pipeline
 * @param {Object} params
 * @param {string} params.userMessage - The user's question
 * @param {string} params.sessionId - Session ID for conversation memory
 * @param {Function} params.onChunk - Optional callback for streaming chunks
 * @returns {Promise<string>} The full AI response
 */
export async function runRAGAgent({ userMessage, sessionId, onChunk }) {
  try {
    console.log('🔍 Step 1: Retrieving relevant KB documents...');
    // Step 1: Retrieve relevant KB documents from pgvector
    const store = await getVectorStore();
    const retriever = store.asRetriever({ k: 4 });
    const relevantDocs = await retriever.invoke(userMessage);
    
    console.log(`✅ Retrieved ${relevantDocs.length} documents`);
    
    // Format context from retrieved documents
    const context = relevantDocs
      .map((doc, idx) => `[Source ${idx + 1}]\n${doc.pageContent}`)
      .join('\n\n---\n\n');

    console.log('💾 Step 2: Loading conversation history...');
    // Step 2: Retrieve conversation history from chat_history table
    const historyResult = await pool.query(
      `SELECT role, content FROM chat_history 
       WHERE session_id = $1 
       ORDER BY created_at ASC 
       LIMIT 10`,
      [sessionId]
    );
    const conversationHistory = historyResult.rows;
    console.log(`✅ Loaded ${conversationHistory.length} history messages`);

    console.log('📝 Step 3: Constructing prompt...');
    // Step 3: Construct messages array
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT.replace('{context}', context || 'No relevant context found.')
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    console.log('💬 Step 4: Saving user message...');
    // Step 4: Insert user message into chat_history
    await pool.query(
      `INSERT INTO chat_history (session_id, role, content) 
       VALUES ($1, $2, $3)`,
      [sessionId, 'user', userMessage]
    );

    console.log('🤖 Step 5: Calling AI model...');
    // Step 5: Call NVIDIA model with streaming
    // Try meta/llama-3.1-8b-instruct as fallback if deepseek doesn't work
    const completion = await Promise.race([
      llmClient.chat.completions.create({
        model: 'meta/llama-3.1-8b-instruct',
        messages: messages,
        temperature: 0.3,
        top_p: 0.95,
        max_tokens: 1024,
        stream: true
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout after 30 seconds')), 30000)
      )
    ]);

    console.log('📡 Step 6: Processing stream...');
    // Step 6: Process stream and accumulate response
    let fullResponse = '';
    
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        fullResponse += delta;
        
        // Call onChunk callback if provided (for real-time streaming)
        if (onChunk && typeof onChunk === 'function') {
          onChunk(delta);
        }
      }
    }

    console.log(`✅ Got full response (${fullResponse.length} chars)`);

    console.log('💾 Step 7: Saving assistant response...');
    // Step 7: Insert assistant response into chat_history
    await pool.query(
      `INSERT INTO chat_history (session_id, role, content) 
       VALUES ($1, $2, $3)`,
      [sessionId, 'assistant', fullResponse]
    );

    console.log('✅ RAG pipeline complete!');
    return fullResponse;

  } catch (error) {
    console.error('❌ RAG Agent Error:', error);
    throw new Error(`RAG pipeline failed: ${error.message}`);
  }
}

// Export pool for use in other modules if needed
export { pool };
