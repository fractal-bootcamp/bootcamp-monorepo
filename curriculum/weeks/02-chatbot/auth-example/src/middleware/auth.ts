import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { verifyJWT, getTokenFromRequest } from '../utils/jwt.js';
import { findUserById, findUserBySecret } from '../config/database.js';

/**
 * STEP 4-5: Basic authentication middleware using secrets
 * This demonstrates the first approach before JWT
 * (Keep this for educational purposes but use authenticateToken in practice)
 */
export const authenticateSecret = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('🔐 [AUTH] Using secret-based authentication (educational demo)');

    // Check Authorization header for Bearer token
    const authHeader = req.headers.authorization;
    let secret: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        secret = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // Fallback to cookie
    if (!secret && req.cookies?.secret) {
        secret = req.cookies.secret;
    }

    if (!secret) {
        return res.status(401).json({
            success: false,
            error: 'Access denied. No secret provided.',
            message: 'Provide secret in Authorization header (Bearer <secret>) or cookie'
        });
    }

    // Find user by secret
    const user = findUserBySecret(secret);
    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Invalid secret',
            message: 'Secret not recognized'
        });
    }

    // Attach user to request
    req.user = user;
    console.log(`✅ [AUTH] User authenticated: ${user.username} (${user.role})`);
    next();
};

/**
 * STEP 8-10: JWT-based authentication (recommended approach)
 * This is the secure, production-ready version
 */
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('🔐 [AUTH] Using JWT-based authentication');

    // Get token from request (header or cookie)
    const token = getTokenFromRequest(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access denied. No token provided.',
            message: 'Provide JWT token in Authorization header (Bearer <token>) or cookie'
        });
    }

    // Verify JWT token
    const decoded = verifyJWT(token);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token',
            message: 'Please login again to get a new token'
        });
    }

    // Get fresh user data from database
    const user = findUserById(decoded.userId);
    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'User not found',
            message: 'User associated with token no longer exists'
        });
    }

    // Attach fresh user data to request
    req.user = user;
    console.log(`✅ [AUTH] User authenticated: ${user.username} (${user.role}) via JWT`);
    next();
};

/**
 * STEP 5: Role-based authorization middleware
 * Requires user to have admin role
 */
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'You must be logged in to access this resource'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Admin access required',
            message: 'You must be an admin to access this resource'
        });
    }

    console.log(`👑 [AUTH] Admin access granted to: ${req.user.username}`);
    next();
};

/**
 * Middleware to check if user is authenticated (any role)
 * More lenient than requireAdmin
 */
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'You must be logged in to access this resource'
        });
    }

    console.log(`🔓 [AUTH] Authenticated access granted to: ${req.user.username} (${req.user.role})`);
    next();
};

/**
 * Optional middleware - adds user info if token is provided, but doesn't require it
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = getTokenFromRequest(req);

    if (token) {
        const decoded = verifyJWT(token);
        if (decoded) {
            const user = findUserById(decoded.userId);
            if (user) {
                req.user = user;
                console.log(`🔓 [AUTH] Optional auth: User identified as ${user.username}`);
            }
        }
    }

    next(); // Continue regardless of authentication status
}; 