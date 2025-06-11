import { Request } from 'express';

export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'basic';
    secret: string;
    createdAt: Date;
}

export interface JWTPayload {
    userId: number;
    username: string;
    role: 'admin' | 'basic';
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
}

export interface ChatHistory {
    id: string;
    userId: number;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: Omit<User, 'password' | 'secret'>;
    message: string;
}

export interface ChatRequest {
    messages: ChatMessage[];
    stream?: boolean;
}

export interface UserProfile {
    id: number;
    username: string;
    role: string;
    createdAt: Date;
    chatCount?: number;
} 