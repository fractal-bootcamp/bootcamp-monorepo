import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { bearer } from '@elysiajs/bearer'
import { cookie } from '@elysiajs/cookie'
import type { User, JWTPayload } from '../types/index.ts'
import { findUserById, findUserBySecret } from '../database/index.ts'

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'

// JWT plugin setup
export const authSetup = new Elysia({ name: 'auth-setup' })
    .use(jwt({ name: 'jwt', secret: JWT_SECRET }))
    .use(bearer())
    .use(cookie())

// Helper function to create JWT payload
export const createJWTPayload = (user: User): JWTPayload => ({
    userId: user.id,
    username: user.username,
    role: user.role
})

// Sign JWT token
export const signJWT = async (app: any, user: User): Promise<string> => {
    const payload = createJWTPayload(user)
    return await app.jwt.sign(payload)
}

// Verify JWT token
export const verifyJWT = async (app: any, token: string): Promise<JWTPayload | null> => {
    try {
        const payload = await app.jwt.verify(token)
        return payload as JWTPayload
    } catch {
        return null
    }
}

// STEP 4-5: Secret-based authentication (educational demo)
export const authenticateSecret = new Elysia({ name: 'auth-secret' })
    .use(authSetup)
    .derive(async ({ bearer, cookie, set }) => {
        console.log('🔐 [AUTH] Using secret-based authentication (educational demo)')

        // Get secret from bearer token or cookie
        const secret = bearer || cookie.secret

        if (!secret) {
            set.status = 401
            return {
                success: false,
                error: 'Access denied. No secret provided.',
                message: 'Provide secret in Authorization header (Bearer <secret>) or cookie'
            }
        }

        // Find user by secret
        const user = findUserBySecret(secret)
        if (!user) {
            set.status = 401
            return {
                success: false,
                error: 'Invalid secret',
                message: 'Secret not recognized'
            }
        }

        console.log(`✅ [AUTH] User authenticated: ${user.username} (${user.role})`)
        return { user }
    })

// STEP 8-10: JWT-based authentication (recommended approach)
export const authenticateJWT = new Elysia({ name: 'auth-jwt' })
    .use(authSetup)
    .derive(async ({ bearer, cookie, jwt, set }) => {
        console.log('🔐 [AUTH] Using JWT-based authentication')

        // Get token from bearer auth or cookie
        const token = bearer || cookie.token

        if (!token) {
            set.status = 401
            return {
                success: false,
                error: 'Access denied. No token provided.',
                message: 'Provide JWT token in Authorization header (Bearer <token>) or cookie'
            }
        }

        // Verify JWT token
        const decoded = await verifyJWT({ jwt }, token)
        if (!decoded) {
            set.status = 401
            return {
                success: false,
                error: 'Invalid or expired token',
                message: 'Please login again to get a new token'
            }
        }

        // Get fresh user data from database
        const user = findUserById(decoded.userId)
        if (!user) {
            set.status = 401
            return {
                success: false,
                error: 'User not found',
                message: 'User associated with token no longer exists'
            }
        }

        console.log(`✅ [AUTH] User authenticated: ${user.username} (${user.role}) via JWT`)
        return { user }
    })

// STEP 5: Role-based authorization middleware
export const requireAdmin = new Elysia({ name: 'require-admin' })
    .use(authenticateJWT)
    .derive(({ user, set }) => {
        if (!user) {
            set.status = 401
            return {
                success: false,
                error: 'Authentication required',
                message: 'You must be logged in to access this resource'
            }
        }

        if (user.role !== 'admin') {
            set.status = 403
            return {
                success: false,
                error: 'Admin access required',
                message: 'You must be an admin to access this resource'
            }
        }

        console.log(`👑 [AUTH] Admin access granted to: ${user.username}`)
        return { user }
    })

// Middleware to check if user is authenticated (any role)
export const requireAuth = new Elysia({ name: 'require-auth' })
    .use(authenticateJWT)
    .derive(({ user, set }) => {
        if (!user) {
            set.status = 401
            return {
                success: false,
                error: 'Authentication required',
                message: 'You must be logged in to access this resource'
            }
        }

        console.log(`🔓 [AUTH] Authenticated access granted to: ${user.username} (${user.role})`)
        return { user }
    })

// Optional middleware - adds user info if token is provided, but doesn't require it
export const optionalAuth = new Elysia({ name: 'optional-auth' })
    .use(authSetup)
    .derive(async ({ bearer, cookie, jwt }) => {
        const token = bearer || cookie.token

        if (token) {
            const decoded = await verifyJWT({ jwt }, token)
            if (decoded) {
                const user = findUserById(decoded.userId)
                if (user) {
                    console.log(`🔓 [AUTH] Optional auth: User identified as ${user.username}`)
                    return { user }
                }
            }
        }

        return { user: undefined }
    }) 