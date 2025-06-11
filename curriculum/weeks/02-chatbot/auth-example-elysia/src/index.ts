import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { authRoutes } from './routes/auth.ts'
import { chatRoutes } from './routes/chat.ts'
import { profileRoutes } from './routes/profile.ts'
import { healthRoutes } from './routes/health.ts'
import { infoRoutes } from './routes/info.ts'

const PORT = process.env.PORT || 3001
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`

const app = new Elysia()
    // Security and CORS middleware
    .use(cors({
        origin: process.env.NODE_ENV === 'development'
            ? [SERVER_URL]
            : ['https://your-production-domain.com'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    }))

    // Auto-generated OpenAPI documentation - Elysia handles the rest!
    .use(swagger({
        documentation: {
            info: {
                title: 'Authentication & AI Chat API',
                version: '1.0.0',
                description: 'A comprehensive authentication and AI chat API built with ElysiaJS with auto-generated documentation.'
            },
            servers: [{ url: SERVER_URL }]
        }
    }))

    // Request logging middleware
    .onRequest(({ request }) => {
        const timestamp = new Date().toISOString()
        console.log(`${timestamp} ${request.method} ${new URL(request.url).pathname}`)
    })

    // Register route modules
    .use(healthRoutes) // middleware sits between a request and a response
    .use(infoRoutes)  // the WHOLE SERVER sits between a request and a response
    .use(authRoutes)
    .use(chatRoutes)
    .use(profileRoutes)

    // Global error handler
    .onError(({ error, code, set }) => {
        console.error('❌ [ERROR] Unhandled error:', error)

        // Don't expose error details in production
        const isDevelopment = process.env.NODE_ENV === 'development'
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        switch (code) {
            case 'VALIDATION':
                set.status = 400
                return {
                    success: false,
                    error: 'Validation failed',
                    message: isDevelopment ? errorMessage : 'Invalid request data'
                }
            case 'NOT_FOUND':
                set.status = 404
                return {
                    success: false,
                    error: 'Route not found',
                    message: 'The requested endpoint was not found'
                }
            default:
                set.status = 500
                return {
                    success: false,
                    error: 'Internal server error',
                    message: isDevelopment ? errorMessage : 'Something went wrong'
                }
        }
    })

    // Start server
    .listen(PORT, () => {
        console.log(`
🚀 ElysiaJS Authentication & AI Chat API Server Started!

📍 Server: ${SERVER_URL}
📚 API Docs: ${SERVER_URL}/swagger
🏥 Health: ${SERVER_URL}/health
🌍 Environment: ${process.env.NODE_ENV || 'development'}

🔧 Configuration:
   ${process.env.OPENAI_API_KEY ? '✅ OpenAI API Key configured' : '⚠️  OpenAI API Key missing (add to .env)'}
   ${process.env.JWT_SECRET ? '✅ JWT Secret configured' : '⚠️  Using fallback JWT secret (add to .env)'}

📋 Quick Test:
    curl ${SERVER_URL}/api/public

🔐 Test Users:
   Admin: username="admin", password="admin123"
   User:  username="user", password="user123"

✨ Documentation auto-generated from your typed Elysia endpoints!
        `)
    })

export type App = typeof app 