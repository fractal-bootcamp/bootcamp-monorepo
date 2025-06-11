import { Elysia, t } from 'elysia'
import {
    LoginSchema,
    LoginResponseSchema,
    ErrorResponseSchema,
    ApiResponseSchema,
    type LoginRequest,
    type ApiResponse
} from '../types/index.ts'
import { findUserByUsername, getDatabaseStats } from '../database/index.ts'
import { authSetup, requireAdmin, signJWT } from '../middleware/auth.ts'

export const authRoutes = new Elysia({ prefix: '/api' })
    .use(authSetup)
    .post('/login', async ({ body, jwt, cookie, set }) => {
        console.log('🔐 [LOGIN] Attempting login...')

        const { username, password } = body

        // Find user
        const user = findUserByUsername(username)
        if (!user || user.password !== password) {
            console.log(`❌ [LOGIN] Failed login attempt for username: ${username}`)
            set.status = 401
            return {
                success: false,
                error: 'Authentication failed',
                message: 'Invalid username or password'
            }
        }

        // Sign JWT token
        const token = await jwt.sign({
            userId: user.id,
            username: user.username,
            role: user.role
        })

        // Set cookie (HttpOnly for security)
        cookie.token = {
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 // 1 hour
        }

        console.log(`✅ [LOGIN] Successful login: ${user.username} (${user.role})`)

        return {
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt
                },
                message: 'Login successful'
            },
            message: 'Login successful'
        }
    }, {
        body: LoginSchema,
        response: {
            200: LoginResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: 'Login with username and password',
            description: `
        Authenticate user and receive JWT token.
        The token will be set in a cookie and also returned in the response.
        
        **Available test users:**
        - admin / admin123 (role: admin)
        - user / user123 (role: basic)
      `,
            tags: ['Authentication']
        }
    })

    .post('/logout', ({ cookie, set }) => {
        console.log('🚪 [LOGOUT] User logging out...')

        // Clear the token cookie
        delete cookie.token

        return {
            success: true,
            message: 'Logout successful'
        }
    }, {
        response: {
            200: ApiResponseSchema
        },
        detail: {
            summary: 'Logout and clear authentication',
            description: 'Clear JWT token from cookies and invalidate session',
            tags: ['Authentication']
        }
    })

    .get('/public', () => {
        console.log('🌍 [PUBLIC] Public endpoint accessed')

        return {
            success: true,
            data: {
                message: 'This is public information',
                timestamp: new Date().toISOString(),
                serverInfo: 'ElysiaJS Auth Example',
                documentation: '/swagger'
            },
            message: 'Public access granted'
        }
    }, {
        response: {
            200: ApiResponseSchema
        },
        detail: {
            summary: 'Public endpoint (no authentication required)',
            description: `
        This endpoint demonstrates a public API that anyone can access.
        Part of Steps 1-2 in the assignment progression.
      `,
            tags: ['Public']
        }
    })

    .use(requireAdmin)
    .get('/protected', ({ user }) => {
        console.log(`🔒 [PROTECTED] Admin access granted to: ${user?.username}`)

        return {
            success: true,
            data: {
                message: 'Only admin should be able to see this',
                user: user?.username,
                role: user?.role,
                timestamp: new Date().toISOString(),
                secretData: 'This is confidential admin information'
            },
            message: 'Admin access granted'
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema,
            403: ErrorResponseSchema
        },
        detail: {
            summary: 'Admin-only protected endpoint',
            description: `
        This endpoint demonstrates authentication and authorization.
        Only users with admin role can access this endpoint.
        Part of Steps 4-12 in the assignment progression.
      `,
            tags: ['Protected'],
            security: [{ bearerAuth: [] }]
        }
    })

    // Educational demo endpoint using secret-based auth
    .get('/protected/secret-demo', ({ user }) => {
        console.log(`🔑 [SECRET-DEMO] Secret auth granted to: ${user?.username}`)

        return {
            success: true,
            data: {
                message: 'Secret-based authentication successful (educational demo)',
                user: user?.username,
                role: user?.role,
                warning: 'This method is insecure - use JWT in production',
                problems: [
                    'Secrets can be intercepted',
                    'No expiration mechanism',
                    'Difficult to rotate secrets',
                    'Vulnerable to XSS/CSRF attacks'
                ]
            },
            message: 'Educational demo: Secret authentication (DO NOT USE IN PRODUCTION)'
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema,
            403: ErrorResponseSchema
        },
        detail: {
            summary: 'Secret-based authentication demo (educational)',
            description: `
        This endpoint demonstrates the old secret-based authentication method.
        Use this to understand why JWT tokens are better.
        
        **Available secrets:**
        - admin-secret-123 (admin user)
        - user-secret-456 (basic user)
        
        **Note:** This is for educational purposes only. Use JWT authentication in production.
      `,
            tags: ['Protected'],
            security: [{ bearerAuth: [] }]
        }
    })

    .get('/debug/database', () => {
        console.log('🔍 [DEBUG] Database stats requested')

        const stats = getDatabaseStats()

        return {
            success: true,
            data: {
                ...stats,
                note: 'This endpoint is for development/learning purposes only'
            },
            message: 'Database statistics retrieved'
        }
    }, {
        response: {
            200: ApiResponseSchema
        },
        detail: {
            summary: 'Database statistics (development only)',
            description: 'Show current database state for debugging and learning',
            tags: ['Public']
        }
    }) 