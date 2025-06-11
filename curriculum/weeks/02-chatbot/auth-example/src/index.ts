import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import { swaggerSpec } from './config/swagger.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import profileRoutes from './routes/profile.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Swagger needs eval
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000']
        : ['https://your-production-domain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests',
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 auth attempts per windowMs
    message: {
        success: false,
        error: 'Too many authentication attempts',
        message: 'Too many login attempts from this IP, please try again later.'
    },
});

app.use('/api/login', authLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        },
        message: 'Server is running'
    });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Auth & AI Chat API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        defaultModelRendering: 'model',
    }
}));

// Serve OpenAPI spec as JSON
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// API Routes
app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', profileRoutes);

// Root endpoint with helpful information
app.get('/', (req, res) => {
    const welcomeMessage = {
        success: true,
        data: {
            message: 'Welcome to the Authentication & AI Chat API!',
            documentation: '/api-docs',
            health: '/health',
            version: '1.0.0',
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
            },
            quickStart: [
                '1. Visit /api-docs for interactive API documentation',
                '2. Login with test credentials (admin/admin123 or user/user123)',
                '3. Use the returned JWT token to access protected endpoints',
                '4. Try the AI chat endpoints with your OpenAI API key'
            ]
        },
        message: 'API is ready to use!'
    };

    res.json(welcomeMessage);
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `The route ${req.method} ${req.baseUrl || req.path} was not found`,
        availableEndpoints: '/api-docs'
    });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('❌ [ERROR] Unhandled error:', err);

    // Don't expose error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';

    res.status(err.status || 500).json({
        success: false,
        error: 'Internal server error',
        message: isDevelopment ? err.message : 'Something went wrong',
        ...(isDevelopment && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 Authentication & AI Chat API Server Started!

📍 Server running on: http://localhost:${PORT}
📚 API Documentation: http://localhost:${PORT}/api-docs
🏥 Health Check: http://localhost:${PORT}/health
🌍 Environment: ${process.env.NODE_ENV || 'development'}

📋 Quick Test:
   curl http://localhost:${PORT}/api/public

🔐 Test Users:
   Admin: username="admin", password="admin123"
   User:  username="user", password="user123"

💡 Next Steps:
   1. Visit http://localhost:${PORT}/api-docs
   2. Try the login endpoint with test credentials
   3. Use the JWT token to access protected endpoints
   4. Add your OpenAI API key to test AI chat features

🔧 Configuration:
   ${process.env.OPENAI_API_KEY ? '✅ OpenAI API Key configured' : '⚠️  OpenAI API Key missing (add to .env)'}
   ${process.env.JWT_SECRET ? '✅ JWT Secret configured' : '⚠️  Using fallback JWT secret (add to .env)'}
`);

    console.log('🎯 [STARTUP] All systems ready!');
}); 