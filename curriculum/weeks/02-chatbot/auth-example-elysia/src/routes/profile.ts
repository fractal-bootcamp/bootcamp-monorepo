import { Elysia, t } from 'elysia'
import {
    UserProfileUpdateSchema,
    ApiResponseSchema,
    ErrorResponseSchema,
    UserSchema,
    type UserProfileUpdate,
    type ApiResponse
} from '../types/index.ts'
import { requireAuth } from '../middleware/auth.ts'
import { getChatHistoryByUserId } from '../database/index.ts'

export const profileRoutes = new Elysia({ prefix: '/api' })
    .use(requireAuth)
    .get('/profile', ({ user }) => {
        console.log(`👤 [PROFILE] Profile request from user: ${user?.username}`)

        const chatHistory = getChatHistoryByUserId(user!.id)

        const profile = {
            id: user!.id,
            username: user!.username,
            role: user!.role,
            createdAt: user!.createdAt,
            chatCount: chatHistory.length
        }

        console.log(`✅ [PROFILE] Profile retrieved for ${user!.username}`)

        return {
            success: true,
            data: profile,
            message: 'Profile retrieved successfully'
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: 'Get authenticated user profile',
            description: `
        Retrieve the profile information for the currently authenticated user.
        Includes basic user info and usage statistics.
      `,
            tags: ['User Management'],
            security: [{ bearerAuth: [] }]
        }
    })

    .put('/profile', ({ body, user }) => {
        console.log(`✏️ [PROFILE] Profile update request from user: ${user?.username}`)

        const { username } = body

        // In a real application, you would:
        // 1. Check if username is already taken
        // 2. Update the database
        // 3. Handle concurrency issues
        // 4. Validate username format/length

        // For this demo, we'll just update the in-memory user object
        const oldUsername = user!.username
        if (username) {
            user!.username = username
        }

        const chatHistory = getChatHistoryByUserId(user!.id)

        const updatedProfile = {
            id: user!.id,
            username: user!.username,
            role: user!.role,
            createdAt: user!.createdAt,
            chatCount: chatHistory.length
        }

        console.log(`✅ [PROFILE] Profile updated: ${oldUsername} → ${user!.username}`)

        return {
            success: true,
            data: updatedProfile,
            message: 'Profile updated successfully'
        }
    }, {
        body: UserProfileUpdateSchema,
        response: {
            200: ApiResponseSchema,
            400: ErrorResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: 'Update authenticated user profile',
            description: `
        Update profile information for the currently authenticated user.
        Currently supports updating username only.
        Note: This is a simplified example - in production you'd want more validation.
      `,
            tags: ['User Management'],
            security: [{ bearerAuth: [] }]
        }
    })

    .get('/profile/stats', ({ user }) => {
        console.log(`📊 [PROFILE-STATS] Stats request from user: ${user?.username}`)

        const chatHistory = getChatHistoryByUserId(user!.id)

        // Calculate account age
        const accountAgeMs = Date.now() - user!.createdAt.getTime()
        const accountAgeDays = Math.floor(accountAgeMs / (1000 * 60 * 60 * 24))

        // Find last activity (most recent chat)
        const lastActivity = chatHistory.length > 0
            ? chatHistory.reduce((latest, chat) =>
                chat.updatedAt > latest ? chat.updatedAt : latest,
                chatHistory[0].updatedAt
            )
            : user!.createdAt

        const stats = {
            userId: user!.id,
            username: user!.username,
            role: user!.role,
            totalChats: chatHistory.length,
            accountAge: `${accountAgeDays} days`,
            accountCreated: user!.createdAt.toISOString(),
            lastActivity: lastActivity.toISOString(),
            averageChatsPerDay: accountAgeDays > 0 ? (chatHistory.length / accountAgeDays).toFixed(2) : '0',
            totalMessages: chatHistory.reduce((total, history) => total + history.messages.length, 0)
        }

        console.log(`✅ [PROFILE-STATS] Stats retrieved for ${user!.username}`)

        return {
            success: true,
            data: stats,
            message: 'User statistics retrieved'
        }
    }, {
        response: {
            200: ApiResponseSchema,
            401: ErrorResponseSchema
        },
        detail: {
            summary: 'Get user usage statistics',
            description: `
        Get detailed usage statistics for the authenticated user.
        Includes chat activity and other metrics.
      `,
            tags: ['User Management'],
            security: [{ bearerAuth: [] }]
        }
    }) 