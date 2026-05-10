-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create knowledge base documents table with vector embeddings
CREATE TABLE IF NOT EXISTS kb_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    embedding VECTOR(1024) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create IVFFlat index for fast approximate nearest neighbor search
-- Using cosine similarity with 100 lists
CREATE INDEX IF NOT EXISTS kb_documents_embedding_idx 
ON kb_documents 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Create chat history table for conversation memory
CREATE TABLE IF NOT EXISTS chat_history (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on session_id and created_at for efficient conversation retrieval
CREATE INDEX IF NOT EXISTS chat_history_session_idx 
ON chat_history (session_id, created_at);

-- Display success message
SELECT 'RAG schema setup completed successfully!' AS status;
