import { Router, Request, Response } from 'express';
import { AuthenticatedRequest, UserProfile, ApiResponse } from '../types/index.js';
import { authenticateToken, requireAuth } from '../middleware/auth.js';
import { findUserById, getChatHistoryByUserId } from '../config/database.js';

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags: [User Management]
 *     summary: Get authenticated user profile
 *     description: |
 *       Retrieve the profile information for the currently authenticated user.
 *       Includes basic user info and usage statistics.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 username: "admin"
 *                 role: "admin"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 chatCount: 5
 *               message: "Profile retrieved successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/profile', authenticateToken, requireAuth, (req: AuthenticatedRequest, res: Response) => {
    console.log(`👤 [PROFILE] Profile request from user: ${req.user?.username}`);

    const user = req.user!;
    const chatHistory = getChatHistoryByUserId(user.id);

    const profile: UserProfile = {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        chatCount: chatHistory.length
    };

    console.log(`✅ [PROFILE] Profile retrieved for ${user.username}`);

    res.json({
        success: true,
        data: profile,
        message: 'Profile retrieved successfully'
    } as ApiResponse<UserProfile>);
});

/**
 * @swagger
 * /api/profile:
 *   put:
 *     tags: [User Management]
 *     summary: Update authenticated user profile
 *     description: |
 *       Update profile information for the currently authenticated user.
 *       Currently supports updating username only.
 *       Note: This is a simplified example - in production you'd want more validation.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *                 example: "new_username"
 *             example:
 *               username: "updated_admin"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 username: "updated_admin"
 *                 role: "admin"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 chatCount: 5
 *               message: "Profile updated successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/profile', authenticateToken, requireAuth, (req: AuthenticatedRequest, res: Response) => {
    console.log(`✏️ [PROFILE] Profile update request from user: ${req.user?.username}`);

    const { username } = req.body;

    // Validate input
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            message: 'Username is required and must be a non-empty string'
        } as ApiResponse);
    }

    // In a real application, you would:
    // 1. Check if username is already taken
    // 2. Update the database
    // 3. Handle concurrency issues
    // 4. Validate username format/length

    // For this demo, we'll just update the in-memory user object
    const user = req.user!;
    const oldUsername = user.username;
    user.username = username.trim();

    const chatHistory = getChatHistoryByUserId(user.id);

    const updatedProfile: UserProfile = {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        chatCount: chatHistory.length
    };

    console.log(`✅ [PROFILE] Profile updated: ${oldUsername} → ${user.username}`);

    res.json({
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully'
    } as ApiResponse<UserProfile>);
});

/**
 * @swagger
 * /api/profile/stats:
 *   get:
 *     tags: [User Management]
 *     summary: Get user usage statistics
 *     description: |
 *       Get detailed usage statistics for the authenticated user.
 *       Includes chat activity and other metrics.
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 userId: 1
 *                 username: "admin"
 *                 totalChats: 5
 *                 accountAge: "30 days"
 *                 lastActivity: "2024-01-01T00:00:00.000Z"
 *               message: "User statistics retrieved"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/profile/stats', authenticateToken, requireAuth, (req: AuthenticatedRequest, res: Response) => {
    console.log(`📊 [PROFILE-STATS] Stats request from user: ${req.user?.username}`);

    const user = req.user!;
    const chatHistory = getChatHistoryByUserId(user.id);

    // Calculate account age
    const accountAgeMs = Date.now() - user.createdAt.getTime();
    const accountAgeDays = Math.floor(accountAgeMs / (1000 * 60 * 60 * 24));

    // Find last activity (most recent chat)
    const lastActivity = chatHistory.length > 0
        ? chatHistory.reduce((latest, chat) =>
            chat.updatedAt > latest ? chat.updatedAt : latest,
            chatHistory[0].updatedAt
        )
        : user.createdAt;

    const stats = {
        userId: user.id,
        username: user.username,
        role: user.role,
        totalChats: chatHistory.length,
        accountAge: `${accountAgeDays} days`,
        accountCreated: user.createdAt.toISOString(),
        lastActivity: lastActivity.toISOString(),
        averageChatsPerDay: accountAgeDays > 0 ? (chatHistory.length / accountAgeDays).toFixed(2) : '0'
    };

    console.log(`✅ [PROFILE-STATS] Stats retrieved for ${user.username}`);

    res.json({
        success: true,
        data: stats,
        message: 'User statistics retrieved'
    } as ApiResponse);
});

export default router; 