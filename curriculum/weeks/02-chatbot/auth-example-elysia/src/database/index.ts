import type { User, ChatHistory } from '../types/index.ts'

// In-memory users database (Steps 1-12 of the assignment)
export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123', // In real apps, this would be hashed
        role: 'admin',
        secret: 'admin-secret-123',
        createdAt: new Date('2024-01-01')
    },
    {
        id: 2,
        username: 'user',
        password: 'user123', // In real apps, this would be hashed
        role: 'basic',
        secret: 'user-secret-456',
        createdAt: new Date('2024-01-01')
    }
]

// In-memory chat history storage
export const chatHistories: ChatHistory[] = []

// Helper functions for user management
export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username === username)
}

export const findUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id)
}

export const findUserBySecret = (secret: string): User | undefined => {
    return users.find(user => user.secret === secret)
}

// Helper functions for chat history
export const getChatHistoryByUserId = (userId: number): ChatHistory[] => {
    return chatHistories.filter(history => history.userId === userId)
}

export const createChatHistory = (userId: number): ChatHistory => {
    const chatHistory: ChatHistory = {
        id: `chat_${Date.now()}_${userId}`,
        userId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }

    chatHistories.push(chatHistory)
    return chatHistory
}

export const addMessageToChatHistory = (userId: number, message: any): ChatHistory => {
    let history = chatHistories.find(h => h.userId === userId)

    if (!history) {
        history = createChatHistory(userId)
    }

    history.messages.push({
        ...message,
        timestamp: new Date()
    })
    history.updatedAt = new Date()

    return history
}

export const deleteChatHistoryByUserId = (userId: number): number => {
    const initialLength = chatHistories.length
    const filteredHistories = chatHistories.filter(history => history.userId !== userId)
    chatHistories.length = 0
    chatHistories.push(...filteredHistories)
    return initialLength - chatHistories.length
}

// For demonstration purposes - show current state
export const getDatabaseStats = () => {
    return {
        totalUsers: users.length,
        totalChatHistories: chatHistories.length,
        usersByRole: {
            admin: users.filter(u => u.role === 'admin').length,
            basic: users.filter(u => u.role === 'basic').length
        },
        totalMessages: chatHistories.reduce((total, history) => total + history.messages.length, 0)
    }
} 