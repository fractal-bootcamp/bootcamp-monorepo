import { Router, Request, Response } from 'express';
import { openai } from '@ai-sdk/openai';
import { streamText, generateText } from 'ai';
import { AuthenticatedRequest, ChatRequest, ChatMessage, ApiResponse } from '../types/index.js';
import { authenticateToken, requireAuth } from '../middleware/auth.js';
import { getChatHistoryByUserId, createChatHistory, deleteChatHistoryByUserId } from '../config/database.js';

const router = Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     tags: [AI Chat]
 *     summary: AI chat completion
 *     description: |
 *       Send messages to AI and receive responses.
 *       Supports both streaming and non-streaming responses.
 *       Requires authentication - any logged-in user can use this endpoint.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *           examples:
 *             simple:
 *               summary: Simple question
 *               value:
 *                 messages:
 *                   - role: user
 *                     content: "Hello, how are you?"
 *                 stream: false
 *             conversation:
 *               summary: Multi-turn conversation
 *               value:
 *                 messages:
 *                   - role: user
 *                     content: "What's the weather like?"
 *                   - role: assistant
 *                     content: "I don't have access to real-time weather data."
 *                   - role: user
 *                     content: "Can you tell me a joke instead?"
 *                 stream: false
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 response: "Hello! I'm doing well, thank you for asking. How can I help you today?"
 *                 usage:
 *                   promptTokens: 12
 *                   completionTokens: 20
 *                   totalTokens: 32
 *               message: "Chat response generated"
 *           text/plain:
 *             description: Streaming response (when stream=true)
 *             schema:
 *               type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: AI service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/chat', authenticateToken, requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    console.log(`🤖 [CHAT] Chat request from user: ${req.user?.username}`);

    try {
        const { messages, stream = false }: ChatRequest = req.body;

        // Validate input
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                message: 'Messages array is required and must not be empty'
            } as ApiResponse);
        }

        // Validate message format
        for (const message of messages) {
            if (!message.role || !message.content) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: 'Each message must have role and content'
                } as ApiResponse);
            }
        }

        console.log(`📝 [CHAT] Processing ${messages.length} messages, streaming: ${stream}`);

        if (stream) {
            // Streaming response
            const result = await streamText({
                model: openai('gpt-4o-mini'), // Using mini for cost efficiency
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                temperature: 0.7,
                maxTokens: 500,
            });

            // Set headers for streaming
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            // Stream the response
            return result.toDataStreamResponse();
        } else {
            // Non-streaming response
            const result = await generateText({
                model: openai('gpt-4o-mini'),
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                temperature: 0.7,
                maxTokens: 500,
            });

            console.log(`✅ [CHAT] Generated response for ${req.user?.username} (${result.usage.totalTokens} tokens)`);

            res.json({
                success: true,
                data: {
                    response: result.text,
                    usage: {
                        promptTokens: result.usage.promptTokens,
                        completionTokens: result.usage.completionTokens,
                        totalTokens: result.usage.totalTokens
                    },
                    finishReason: result.finishReason,
                    timestamp: new Date().toISOString()
                },
                message: 'Chat response generated'
            } as ApiResponse);
        }
    } catch (error) {
        console.error('❌ [CHAT] Error generating response:', error);

        res.status(500).json({
            success: false,
            error: 'AI service error',
            message: 'Failed to generate response. Please try again.'
        } as ApiResponse);
    }
});

/**
 * @swagger
 * /api/chat/history:
 *   get:
 *     tags: [AI Chat]
 *     summary: Get user's chat history
 *     description: |
 *       Retrieve paginated chat history for the authenticated user.
 *       Only returns chat history belonging to the current user.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of chat sessions per page
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 history: []
 *                 pagination:
 *                   page: 1
 *                   limit: 10
 *                   total: 0
 *                   totalPages: 0
 *               message: "Chat history retrieved"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/chat/history', authenticateToken, requireAuth, (req: AuthenticatedRequest, res: Response) => {
    console.log(`📚 [CHAT-HISTORY] History request from user: ${req.user?.username}`);

    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const offset = (page - 1) * limit;

    const userHistory = getChatHistoryByUserId(req.user!.id);
    const total = userHistory.length;
    const paginatedHistory = userHistory.slice(offset, offset + limit);

    console.log(`📊 [CHAT-HISTORY] Retrieved ${paginatedHistory.length}/${total} chat sessions`);

    res.json({
        success: true,
        data: {
            history: paginatedHistory,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        },
        message: 'Chat history retrieved'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/chat/history:
 *   delete:
 *     tags: [AI Chat]
 *     summary: Clear user's chat history
 *     description: |
 *       Delete all chat history for the authenticated user.
 *       This action cannot be undone.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Chat history cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 deletedCount: 5
 *               message: "Chat history cleared"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/chat/history', authenticateToken, requireAuth, (req: AuthenticatedRequest, res: Response) => {
    console.log(`🗑️ [CHAT-HISTORY] Clear history request from user: ${req.user?.username}`);

    const deletedCount = deleteChatHistoryByUserId(req.user!.id);

    console.log(`✅ [CHAT-HISTORY] Cleared ${deletedCount} chat sessions for ${req.user?.username}`);

    res.json({
        success: true,
        data: {
            deletedCount
        },
        message: 'Chat history cleared'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/chat/test:
 *   get:
 *     tags: [AI Chat]
 *     summary: Test AI service connection
 *     description: |
 *       Simple endpoint to test if the AI service is working.
 *       Useful for debugging and health checks.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: AI service is working
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 response: "Hello! The AI service is working correctly."
 *                 model: "gpt-4o-mini"
 *                 timestamp: "2024-01-01T00:00:00.000Z"
 *               message: "AI service test successful"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: AI service error
 */
router.get('/chat/test', authenticateToken, requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    console.log(`🧪 [CHAT-TEST] AI service test from user: ${req.user?.username}`);

    try {
        const result = await generateText({
            model: openai('gpt-4o-mini'),
            messages: [
                { role: 'user', content: 'Say hello and confirm you are working correctly.' }
            ],
            temperature: 0.3,
            maxTokens: 50,
        });

        console.log(`✅ [CHAT-TEST] AI service test successful`);

        res.json({
            success: true,
            data: {
                response: result.text,
                model: 'gpt-4o-mini',
                timestamp: new Date().toISOString(),
                usage: result.usage
            },
            message: 'AI service test successful'
        } as ApiResponse);
    } catch (error) {
        console.error('❌ [CHAT-TEST] AI service test failed:', error);

        res.status(500).json({
            success: false,
            error: 'AI service error',
            message: 'AI service test failed. Check your OpenAI API key and connection.'
        } as ApiResponse);
    }
});

export default router; 