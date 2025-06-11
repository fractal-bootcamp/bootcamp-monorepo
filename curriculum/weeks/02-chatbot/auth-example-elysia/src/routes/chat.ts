import { Elysia, t } from 'elysia'
import { openai } from '@ai-sdk/openai'
import { streamText, generateText } from 'ai'
import {
    ChatRequestSchema,
    ApiResponseSchema,
    ErrorResponseSchema,
    type ChatRequest,
    type ApiResponse
} from '../types/index.ts'
import { requireAuth } from '../middleware/auth.ts'
import {
    getChatHistoryByUserId,
    deleteChatHistoryByUserId,
    addMessageToChatHistory
} from '../database/index.ts'

export const chatRoutes = new Elysia({ prefix: '/api' })
    .use(requireAuth)
    .post('/chat', async ({ body, user, set }) => {
        console.log(`🤖 [CHAT] Chat request from user: ${user?.username}`)

        try {
            const { messages, stream = false } = body

            console.log(`📝 [CHAT] Processing ${messages.length} messages, streaming: ${stream}`)

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
                })

                // Add user message to chat history
                if (user) {
                    addMessageToChatHistory(user.id, messages[messages.length - 1])
                }

                return result.toDataStreamResponse()
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
                })

                console.log(`✅ [CHAT] Generated response for ${user?.username} (${result.usage.totalTokens} tokens)`)

                // Add both user message and AI response to chat history
                if (user) {
                    addMessageToChatHistory(user.id, messages[messages.length - 1])
                    addMessageToChatHistory(user.id, {
                        role: 'assistant',
                        content: result.text
                    })
                }

                return {
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
                }
            }
        } catch (error) {
            console.error('❌ [CHAT] Error generating response:', error)

            set.status = 500
            return {
                success: false,
                error: 'AI service error',
                message: 'Failed to generate response. Please try again.'
            }
        }
    }, {
        body: ChatRequestSchema,
        response: {
            200: ApiResponseSchema,
            400: ErrorResponseSchema,
            401: ErrorResponseSchema,
            500: ErrorResponseSchema
        },
        detail: {
            summary: 'AI chat completion',
            description: `
        Send messages to AI and receive responses.
        Supports both streaming and non-streaming responses.
        Requires authentication - any logged-in user can use this endpoint.
      `,
            tags: ['AI Chat'],
            security: [{ bearerAuth: [] }]
        }
    })

    .get('/chat/history', ({ user, query }) => {
        console.log(`📚 [CHAT-HISTORY] History request from user: ${user?.username}`)

        const page = parseInt(query.page as string) || 1
        const limit = Math.min(parseInt(query.limit as string) || 10, 100)
        const offset = (page - 1) * limit

        const userHistory = getChatHistoryByUserId(user!.id)
        const total = userHistory.length
        const paginatedHistory = userHistory.slice(offset, offset + limit)

        console.log(`📊 [CHAT-HISTORY] Retrieved ${paginatedHistory.length}/${total} chat sessions`)

        return {
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
        }
    }, {
        query: t.Object({
            page: t.Optional(t.Number({ minimum: 1, default: 1, description: 'Page number for pagination' })),
            limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10, description: 'Number of chat sessions per page' }))
        }),
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: "Get user's chat history",
            description: `
        Retrieve paginated chat history for the authenticated user.
        Only returns chat history belonging to the current user.
      `,
            tags: ['AI Chat'],
            security: [{ bearerAuth: [] }]
        }
    })

    .delete('/chat/history', ({ user }) => {
        console.log(`🗑️ [CHAT-HISTORY] Clear history request from user: ${user?.username}`)

        const deletedCount = deleteChatHistoryByUserId(user!.id)

        console.log(`✅ [CHAT-HISTORY] Cleared ${deletedCount} chat sessions for ${user?.username}`)

        return {
            success: true,
            data: {
                deletedCount
            },
            message: 'Chat history cleared'
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: "Clear user's chat history",
            description: `
        Delete all chat history for the authenticated user.
        This action cannot be undone.
      `,
            tags: ['AI Chat'],
            security: [{ bearerAuth: [] }]
        }
    })

    .get('/chat/test', async ({ user, set }) => {
        console.log(`🧪 [CHAT-TEST] AI service test from user: ${user?.username}`)

        try {
            const result = await generateText({
                model: openai('gpt-4o-mini'),
                messages: [
                    { role: 'user', content: 'Say hello and confirm you are working correctly.' }
                ],
                temperature: 0.3,
                maxTokens: 50,
            })

            console.log(`✅ [CHAT-TEST] AI service test successful`)

            return {
                success: true,
                data: {
                    response: result.text,
                    model: 'gpt-4o-mini',
                    timestamp: new Date().toISOString(),
                    usage: result.usage
                },
                message: 'AI service test successful'
            }
        } catch (error) {
            console.error('❌ [CHAT-TEST] AI service test failed:', error)

            set.status = 500
            return {
                success: false,
                error: 'AI service error',
                message: 'AI service test failed. Check your OpenAI API key and connection.'
            }
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema,
            500: ErrorResponseSchema
        },
        detail: {
            summary: 'Test AI service connection',
            description: `
        Simple endpoint to test if the AI service is working.
        Useful for debugging and health checks.
      `,
            tags: ['AI Chat'],
            security: [{ bearerAuth: [] }]
        }
    }) 