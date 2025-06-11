import { Elysia } from 'elysia'

export const healthRoutes = new Elysia()
    .get('/health', () => ({
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            framework: 'ElysiaJS',
            environment: process.env.NODE_ENV || 'development'
        },
        message: 'Server is running'
    }), {
        detail: {
            summary: 'Health check endpoint',
            description: 'Check if the server is running and healthy',
            tags: ['System']
        }
    }) 