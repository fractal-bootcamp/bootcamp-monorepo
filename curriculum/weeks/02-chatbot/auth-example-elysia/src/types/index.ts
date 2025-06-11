import { t } from 'elysia'

// Database types
export interface User {
    id: number
    username: string
    password: string
    role: 'admin' | 'basic'
    secret: string
    createdAt: Date
}

export interface JWTPayload {
    userId: number
    username: string
    role: 'admin' | 'basic'
    iat?: number
    exp?: number
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp?: Date
}

export interface ChatHistory {
    id: string
    userId: number
    messages: ChatMessage[]
    createdAt: Date
    updatedAt: Date
}

// Elysia validation schemas
export const LoginSchema = t.Object({
    username: t.String({ minLength: 1, description: 'Username for authentication' }),
    password: t.String({ minLength: 1, description: 'Password for authentication' })
})

export const ChatMessageSchema = t.Object({
    role: t.Union([t.Literal('user'), t.Literal('assistant'), t.Literal('system')]),
    content: t.String({ minLength: 1, description: 'Message content' }),
    timestamp: t.Optional(t.Date())
})

export const ChatRequestSchema = t.Object({
    messages: t.Array(ChatMessageSchema, { minItems: 1, description: 'Array of chat messages' }),
    stream: t.Optional(t.Boolean({ default: false, description: 'Whether to stream the response' }))
})

export const UserProfileUpdateSchema = t.Object({
    username: t.Optional(t.String({ minLength: 1, description: 'New username' }))
})

export const ApiResponseSchema = t.Object({
    success: t.Boolean({ description: 'Whether the request was successful' }),
    data: t.Optional(t.Any({ description: 'Response data (varies by endpoint)' })),
    error: t.Optional(t.String({ description: 'Error message (if success is false)' })),
    message: t.Optional(t.String({ description: 'Human-readable message' }))
})

export const UserSchema = t.Object({
    id: t.Number({ description: 'User ID' }),
    username: t.String({ description: 'Username' }),
    role: t.Union([t.Literal('admin'), t.Literal('basic')], { description: 'User role' }),
    createdAt: t.Date({ description: 'User creation date' })
})

export const LoginResponseSchema = t.Object({
    success: t.Literal(true),
    data: t.Object({
        token: t.String({ description: 'JWT token for authentication' }),
        user: UserSchema,
        message: t.String({ description: 'Login success message' })
    }),
    message: t.String()
})

export const ErrorResponseSchema = t.Object({
    success: t.Literal(false),
    error: t.String({ description: 'Error type' }),
    message: t.String({ description: 'Human-readable error message' })
})

// Type inference helpers for Elysia
export type LoginRequest = typeof LoginSchema.static
export type ChatRequest = typeof ChatRequestSchema.static
export type UserProfileUpdate = typeof UserProfileUpdateSchema.static
export type ApiResponse<T = any> = {
    success: boolean
    data?: T
    error?: string
    message?: string
} 