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
SELECT 'Chat history table created successfully!' AS status;
