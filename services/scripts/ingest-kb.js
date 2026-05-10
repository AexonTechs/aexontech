import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { NVIDIAEmbeddings } from '../utils/nvidia-embeddings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ingestKnowledgeBase() {
  console.log('🚀 Starting Knowledge Base Ingestion...\n');

  try {
    // Step 1: Read the knowledge base markdown file
    const kbPath = path.join(__dirname, '..', 'aexontech_ai_agent_kb.md');
    
    if (!fs.existsSync(kbPath)) {
      throw new Error(`Knowledge base file not found at: ${kbPath}\nPlease create aexontech_ai_agent_kb.md in the services folder.`);
    }

    const kbContent = fs.readFileSync(kbPath, 'utf-8');
    console.log(`✅ Loaded knowledge base file (${kbContent.length} characters)`);

    // Step 2: Initialize NVIDIA embeddings with custom class
    const embeddings = new NVIDIAEmbeddings({
      apiKey: process.env.NVIDIA_API_KEY,
      model: 'nvidia/nv-embedqa-e5-v5'
    });
    console.log('✅ Initialized NVIDIA embeddings model (nv-embedqa-e5-v5)');

    // Step 3: Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 80,
      separators: ['\n\n', '\n', '. ', ' ', '']
    });

    const docs = await textSplitter.createDocuments([kbContent]);
    console.log(`✅ Split knowledge base into ${docs.length} chunks`);

    // Step 4: Connect to PGVectorStore and upsert documents
    console.log('📊 Connecting to PostgreSQL and upserting documents...');
    
    const vectorStore = await PGVectorStore.fromDocuments(
      docs,
      embeddings,
      {
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
      }
    );

    console.log('✅ Successfully embedded and stored all documents in pgvector!');
    console.log('\n🎉 Knowledge Base Ingestion Complete!');
    console.log(`   - Total chunks: ${docs.length}`);
    console.log(`   - Embedding dimensions: 1024`);
    console.log(`   - Vector store: kb_documents table`);
    console.log('\n💡 You can now start the server and use the RAG agent!');

    process.exit(0);

  } catch (error) {
    console.error('❌ Ingestion failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run ingestion
ingestKnowledgeBase();
