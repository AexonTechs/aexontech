import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runRAGAgent } from '../agent/rag-agent.js';

const router = express.Router();

/**
 * POST /api/chat
 * Standard non-streaming chat endpoint
 */
router.post('/', async (req, res) => {
  console.log('📨 Received chat request:', req.body);
  
  try {
    const { message, sessionId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      console.log('❌ Invalid message');
      return res.status(400).json({
        status: 'error',
        message: 'Message is required and must be a non-empty string'
      });
    }

    // Generate session ID if not provided
    const finalSessionId = sessionId || uuidv4();
    console.log('🔑 Session ID:', finalSessionId);

    console.log('🤖 Calling RAG agent...');
    // Run RAG agent without streaming
    const answer = await runRAGAgent({
      userMessage: message.trim(),
      sessionId: finalSessionId,
      onChunk: null // No streaming for this endpoint
    });

    console.log('✅ Got response:', answer.substring(0, 100) + '...');

    // Return response
    res.json({
      status: 'success',
      answer: answer,
      sessionId: finalSessionId
    });

  } catch (error) {
    console.error('❌ Chat endpoint error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process chat request',
      error: error.message
    });
  }
});

/**
 * POST /api/chat/stream
 * Server-Sent Events (SSE) streaming chat endpoint
 */
router.post('/stream', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is required and must be a non-empty string'
      });
    }

    // Generate session ID if not provided
    const finalSessionId = sessionId || uuidv4();

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

    // Send initial connection event
    res.write(`data: ${JSON.stringify({ type: 'connected', sessionId: finalSessionId })}\n\n`);

    // Run RAG agent with streaming callback
    await runRAGAgent({
      userMessage: message.trim(),
      sessionId: finalSessionId,
      onChunk: (textChunk) => {
        // Send each chunk as SSE event
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: textChunk })}\n\n`);
      }
    });

    // Send completion event
    res.write(`data: ${JSON.stringify({ type: 'done', sessionId: finalSessionId })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Chat stream endpoint error:', error);
    
    // Send error event if stream is still open
    if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to process streaming chat request',
        error: error.message
      });
    } else {
      res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
      res.end();
    }
  }
});

export default router;
