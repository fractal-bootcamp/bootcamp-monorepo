import { Elysia } from 'elysia'

export const infoRoutes = new Elysia()
    .get('/', () => ({
        success: true,
        data: {
            message: 'Welcome to the Authentication & AI Chat API built with ElysiaJS!',
            framework: 'ElysiaJS',
            documentation: '/swagger',
            health: '/health',
            version: '1.0.0',
            features: [
                'Type-safe authentication with ElysiaJS',
                'Auto-generated OpenAPI documentation',
                'AI chat integration with Vercel AI SDK',
                'JWT-based authentication',
                'Role-based authorization'
            ],
            endpoints: {
                authentication: [
                    'POST /api/login',
                    'POST /api/logout',
                    'GET /api/public',
                    'GET /api/protected'
                ],
                chat: [
                    'POST /api/chat',
                    'GET /api/chat/history',
                    'DELETE /api/chat/history',
                    'GET /api/chat/test'
                ],
                profile: [
                    'GET /api/profile',
                    'PUT /api/profile',
                    'GET /api/profile/stats'
                ]
            },
            testUsers: {
                admin: { username: 'admin', password: 'admin123', role: 'admin' },
                user: { username: 'user', password: 'user123', role: 'basic' }
            }
        },
        message: 'ElysiaJS API is ready to use!'
    }), {
        detail: {
            summary: 'API welcome and information endpoint',
            description: 'Get information about the API, available endpoints, and quick start guide',
            tags: ['System']
        }
    }) 