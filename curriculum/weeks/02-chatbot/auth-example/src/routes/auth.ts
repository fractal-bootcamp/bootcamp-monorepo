import { Router, Request, Response } from 'express';
import { AuthenticatedRequest, LoginRequest, ApiResponse, LoginResponse } from '../types/index.js';
import { signJWT } from '../utils/jwt.js';
import { findUserByUsername, getDatabaseStats } from '../config/database.js';
import { authenticateToken, authenticateSecret, requireAdmin } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login with username and password
 *     description: |
 *       Authenticate user and receive JWT token.
 *       The token will be set in a cookie and also returned in the response.
 *       
 *       **Available test users:**
 *       - admin / admin123 (role: admin)
 *       - user / user123 (role: basic)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             admin:
 *               summary: Admin login
 *               value:
 *                 username: admin
 *                 password: admin123
 *             user:
 *               summary: Basic user login
 *               value:
 *                 username: user
 *                 password: user123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Set-Cookie:
 *             description: JWT token set as HTTP-only cookie
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post('/login', (req: Request, res: Response) => {
    console.log('🔐 [LOGIN] Attempting login...');

    const { username, password }: LoginRequest = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            message: 'Username and password are required'
        } as ApiResponse);
    }

    // Find user
    const user = findUserByUsername(username);
    if (!user || user.password !== password) {
        console.log(`❌ [LOGIN] Failed login attempt for username: ${username}`);
        return res.status(401).json({
            success: false,
            error: 'Authentication failed',
            message: 'Invalid username or password'
        } as ApiResponse);
    }

    // Sign JWT token
    const token = signJWT(user);

    // Set cookie (HttpOnly for security)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1 hour
    });

    console.log(`✅ [LOGIN] Successful login: ${user.username} (${user.role})`);

    // Return success response
    const response: LoginResponse = {
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        },
        message: 'Login successful'
    };

    res.json({
        success: true,
        data: response,
        message: 'Login successful'
    } as ApiResponse<LoginResponse>);
});

/**
 * @swagger
 * /api/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout and clear authentication
 *     description: Clear JWT token from cookies and invalidate session
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: "Logout successful"
 */
router.post('/logout', (req: Request, res: Response) => {
    console.log('🚪 [LOGOUT] User logging out...');

    // Clear the token cookie
    res.clearCookie('token');

    res.json({
        success: true,
        message: 'Logout successful'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/public:
 *   get:
 *     tags: [Public]
 *     summary: Public endpoint (no authentication required)
 *     description: |
 *       This endpoint demonstrates a public API that anyone can access.
 *       Part of Steps 1-2 in the assignment progression.
 *     responses:
 *       200:
 *         description: Public information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 message: "This is public information"
 *                 timestamp: "2024-01-01T00:00:00.000Z"
 *                 serverInfo: "Express.js Auth Example"
 *               message: "Public access granted"
 */
router.get('/public', (req: Request, res: Response) => {
    console.log('🌍 [PUBLIC] Public endpoint accessed');

    res.json({
        success: true,
        data: {
            message: 'This is public information',
            timestamp: new Date().toISOString(),
            serverInfo: 'Express.js Auth Example',
            documentation: '/api-docs'
        },
        message: 'Public access granted'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/protected:
 *   get:
 *     tags: [Protected]
 *     summary: Admin-only protected endpoint
 *     description: |
 *       This endpoint demonstrates authentication and authorization.
 *       Only users with admin role can access this endpoint.
 *       Part of Steps 4-12 in the assignment progression.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Protected information for admin users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 message: "Only admin should be able to see this"
 *                 user: "admin"
 *                 role: "admin"
 *                 timestamp: "2024-01-01T00:00:00.000Z"
 *               message: "Admin access granted"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/protected', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    console.log(`🔒 [PROTECTED] Admin access granted to: ${req.user?.username}`);

    res.json({
        success: true,
        data: {
            message: 'Only admin should be able to see this',
            user: req.user?.username,
            role: req.user?.role,
            timestamp: new Date().toISOString(),
            secretData: 'This is confidential admin information'
        },
        message: 'Admin access granted'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/protected/secret-demo:
 *   get:
 *     tags: [Protected]
 *     summary: Secret-based authentication demo (educational)
 *     description: |
 *       This endpoint demonstrates the old secret-based authentication method.
 *       Use this to understand why JWT tokens are better.
 *       
 *       **Available secrets:**
 *       - admin-secret-123 (admin user)
 *       - user-secret-456 (basic user)
 *       
 *       **Note:** This is for educational purposes only. Use JWT authentication in production.
 *     security:
 *       - SecretAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: "Bearer admin-secret-123"
 *         description: Secret token for authentication
 *     responses:
 *       200:
 *         description: Secret authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/protected/secret-demo', authenticateSecret, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    console.log(`🔑 [SECRET-DEMO] Secret auth granted to: ${req.user?.username}`);

    res.json({
        success: true,
        data: {
            message: 'Secret-based authentication successful (educational demo)',
            user: req.user?.username,
            role: req.user?.role,
            warning: 'This method is insecure - use JWT in production',
            problems: [
                'Secrets can be intercepted',
                'No expiration mechanism',
                'Difficult to rotate secrets',
                'Vulnerable to XSS/CSRF attacks'
            ]
        },
        message: 'Educational demo: Secret authentication (DO NOT USE IN PRODUCTION)'
    } as ApiResponse);
});

/**
 * @swagger
 * /api/debug/database:
 *   get:
 *     tags: [Public]
 *     summary: Database statistics (development only)
 *     description: Show current database state for debugging and learning
 *     responses:
 *       200:
 *         description: Database statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/debug/database', (req: Request, res: Response) => {
    console.log('🔍 [DEBUG] Database stats requested');

    const stats = getDatabaseStats();

    res.json({
        success: true,
        data: {
            ...stats,
            note: 'This endpoint is for development/learning purposes only'
        },
        message: 'Database statistics retrieved'
    } as ApiResponse);
});

export default router; 