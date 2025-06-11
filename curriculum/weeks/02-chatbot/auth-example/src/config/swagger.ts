import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Authentication & AI Chat API',
        version: '1.0.0',
        description: `
      A comprehensive authentication and AI chat API built with Express.js.
      
      This API demonstrates:
      - JWT-based authentication
      - Role-based access control
      - AI chat integration with Vercel AI SDK
      - Protected API endpoints
      - Complete OpenAPI documentation
      
      ## Authentication Flow
      1. Register or login with username/password
      2. Receive JWT token in response and cookie
      3. Use token in Authorization header: \`Bearer <token>\`
      4. Access protected endpoints with valid token
      
      ## Available Users (for testing)
      - **admin** / **admin123** (role: admin)
      - **user** / **user123** (role: basic)
    `,
        contact: {
            name: 'Fractal Bootcamp',
            url: 'https://github.com/fractal-bootcamp',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://your-production-url.com',
            description: 'Production server (update with your actual URL)',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'JWT token for authentication',
            },
            CookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token',
                description: 'JWT token stored in cookie',
            },
            SecretAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'Secret-based authentication (educational demo only)',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'User ID',
                        example: 1,
                    },
                    username: {
                        type: 'string',
                        description: 'Username',
                        example: 'admin',
                    },
                    role: {
                        type: 'string',
                        enum: ['admin', 'basic'],
                        description: 'User role',
                        example: 'admin',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'User creation date',
                    },
                },
                required: ['id', 'username', 'role'],
            },
            LoginRequest: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'Username',
                        example: 'admin',
                    },
                    password: {
                        type: 'string',
                        description: 'Password',
                        example: 'admin123',
                    },
                },
                required: ['username', 'password'],
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                    },
                    data: {
                        type: 'object',
                        properties: {
                            token: {
                                type: 'string',
                                description: 'JWT token',
                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                            },
                            user: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                    message: {
                        type: 'string',
                        example: 'Login successful',
                    },
                },
            },
            ChatMessage: {
                type: 'object',
                properties: {
                    role: {
                        type: 'string',
                        enum: ['user', 'assistant', 'system'],
                        description: 'Message role',
                        example: 'user',
                    },
                    content: {
                        type: 'string',
                        description: 'Message content',
                        example: 'Hello, how are you?',
                    },
                    timestamp: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Message timestamp',
                    },
                },
                required: ['role', 'content'],
            },
            ChatRequest: {
                type: 'object',
                properties: {
                    messages: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ChatMessage',
                        },
                        description: 'Array of chat messages',
                    },
                    stream: {
                        type: 'boolean',
                        description: 'Whether to stream the response',
                        default: false,
                    },
                },
                required: ['messages'],
            },
            ApiResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        description: 'Whether the request was successful',
                    },
                    data: {
                        type: 'object',
                        description: 'Response data (varies by endpoint)',
                    },
                    error: {
                        type: 'string',
                        description: 'Error message (if success is false)',
                    },
                    message: {
                        type: 'string',
                        description: 'Human-readable message',
                    },
                },
                required: ['success'],
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    error: {
                        type: 'string',
                        example: 'Authentication failed',
                    },
                    message: {
                        type: 'string',
                        example: 'Invalid username or password',
                    },
                },
                required: ['success', 'error'],
            },
        },
        responses: {
            UnauthorizedError: {
                description: 'Authentication required',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse',
                        },
                        example: {
                            success: false,
                            error: 'Access denied',
                            message: 'No token provided',
                        },
                    },
                },
            },
            ForbiddenError: {
                description: 'Insufficient permissions',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse',
                        },
                        example: {
                            success: false,
                            error: 'Admin access required',
                            message: 'You must be an admin to access this resource',
                        },
                    },
                },
            },
            ValidationError: {
                description: 'Invalid request data',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse',
                        },
                        example: {
                            success: false,
                            error: 'Validation failed',
                            message: 'Missing required fields',
                        },
                    },
                },
            },
        },
    },
    tags: [
        {
            name: 'Authentication',
            description: 'User authentication and authorization',
        },
        {
            name: 'Public',
            description: 'Public endpoints (no authentication required)',
        },
        {
            name: 'Protected',
            description: 'Protected endpoints (authentication required)',
        },
        {
            name: 'AI Chat',
            description: 'AI chat endpoints using Vercel AI SDK',
        },
        {
            name: 'User Management',
            description: 'User profile and management endpoints',
        },
    ],
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: [
        './src/routes/*.ts',
        './src/routes/*.js',
        './dist/routes/*.js',
    ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Helper function to generate example JWT token for documentation
export const generateExampleJWT = (): string => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDQwNjcyMDAsImV4cCI6MTcwNDA3MDgwMH0.example';
}; 