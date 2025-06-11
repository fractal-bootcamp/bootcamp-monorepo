# ElysiaJS Authentication & Authorization Guide

A step-by-step guide to implementing authentication and authorization middleware in ElysiaJS, from basic concepts to production-ready solutions.

## Table of Contents

1. [Basic Concepts](#basic-concepts)
2. [Step 1: Simple API Key Authentication](#step-1-simple-api-key-authentication)
3. [Step 2: Basic JWT Authentication](#step-2-basic-jwt-authentication)
4. [Step 3: Role-Based Authorization](#step-3-role-based-authorization)
5. [Step 4: Advanced JWT with Refresh Tokens](#step-4-advanced-jwt-with-refresh-tokens)
6. [Step 5: Permission-Based Authorization](#step-5-permission-based-authorization)
7. [Step 6: Production-Ready Implementation](#step-6-production-ready-implementation)

## Basic Concepts

**Authentication** answers "Who are you?" - verifying user identity
**Authorization** answers "What can you do?" - controlling access to resources

ElysiaJS middleware executes before route handlers, making it perfect for auth checks.

## Step 1: Simple API Key Authentication

Let's start with the simplest form of authentication - API key validation.

```typescript
import { Elysia } from 'elysia'

// Simple API key store (use database in production)
const validApiKeys = new Set(['api-key-123', 'api-key-456'])

const apiKeyAuth = new Elysia()
  .derive(({ headers }) => {
    const apiKey = headers['x-api-key']
    
    if (!apiKey || !validApiKeys.has(apiKey)) {
      throw new Error('Invalid API key')
    }
    
    return {
      apiKey,
      isAuthenticated: true
    }
  })

const app = new Elysia()
  .use(apiKeyAuth)
  .get('/protected', ({ isAuthenticated }) => {
    return { message: 'Access granted!', authenticated: isAuthenticated }
  })
  .get('/public', () => {
    return { message: 'This is public' }
  })
  .listen(3000)

// Test with: curl -H "x-api-key: api-key-123" http://localhost:3000/protected
```

## Step 2: Basic JWT Authentication

Now let's implement JWT-based authentication with login/logout functionality.

```typescript
import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'

// User store (use database in production)
const users = [
  { id: 1, username: 'admin', password: 'password123', role: 'admin' },
  { id: 2, username: 'user', password: 'userpass', role: 'user' }
]

const jwtAuth = new Elysia()
  .use(jwt({ 
    name: 'jwt',
    secret: 'your-secret-key' // Use environment variable in production
  }))
  .use(cookie())
  .derive(async ({ jwt, cookie: { auth } }) => {
    if (!auth) {
      return { user: null, isAuthenticated: false }
    }

    try {
      const payload = await jwt.verify(auth)
      if (!payload) {
        return { user: null, isAuthenticated: false }
      }

      const user = users.find(u => u.id === payload.sub)
      return {
        user,
        isAuthenticated: !!user
      }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  })

const app = new Elysia()
  .use(jwtAuth)
  .post('/login', async ({ body, jwt, cookie: { auth } }) => {
    const { username, password } = body as { username: string, password: string }
    
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = await jwt.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    })

    auth.set({
      value: token,
      httpOnly: true,
      maxAge: 3600,
      path: '/'
    })

    return { message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } }
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String()
    })
  })
  .post('/logout', ({ cookie: { auth } }) => {
    auth.remove()
    return { message: 'Logged out successfully' }
  })
  .get('/profile', ({ user, isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    return { user }
  })
  .listen(3000)
```

## Step 3: Role-Based Authorization

Let's add role-based access control to restrict certain routes based on user roles.

```typescript
import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'

type UserRole = 'admin' | 'user' | 'moderator'

const users = [
  { id: 1, username: 'admin', password: 'password123', role: 'admin' as UserRole },
  { id: 2, username: 'moderator', password: 'modpass', role: 'moderator' as UserRole },
  { id: 3, username: 'user', password: 'userpass', role: 'user' as UserRole }
]

// Authentication middleware
const authMiddleware = new Elysia()
  .use(jwt({ name: 'jwt', secret: 'your-secret-key' }))
  .use(cookie())
  .derive(async ({ jwt, cookie: { auth } }) => {
    if (!auth) {
      return { user: null, isAuthenticated: false }
    }

    try {
      const payload = await jwt.verify(auth)
      const user = users.find(u => u.id === payload?.sub)
      return {
        user,
        isAuthenticated: !!user
      }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  })

// Authorization middleware factory
const requireAuth = () => new Elysia()
  .use(authMiddleware)
  .onBeforeHandle(({ user, isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
  })

const requireRole = (allowedRoles: UserRole[]) => new Elysia()
  .use(requireAuth())
  .onBeforeHandle(({ user }) => {
    if (!user || !allowedRoles.includes(user.role)) {
      throw new Error('Insufficient permissions')
    }
  })

const app = new Elysia()
  .use(authMiddleware)
  
  // Login endpoint
  .post('/login', async ({ body, jwt, cookie: { auth } }) => {
    const { username, password } = body as { username: string, password: string }
    
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = await jwt.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    })

    auth.set({ value: token, httpOnly: true, maxAge: 3600, path: '/' })
    return { message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } }
  })

  // Public route
  .get('/public', () => ({ message: 'This is public' }))

  // Protected routes with different role requirements
  .group('/api', app => app
    .use(requireAuth())
    .get('/profile', ({ user }) => ({ user }))
    
    .group('/admin', app => app
      .use(requireRole(['admin']))
      .get('/users', () => ({ users: users.map(u => ({ id: u.id, username: u.username, role: u.role })) }))
      .delete('/users/:id', ({ params }) => ({ message: `User ${params.id} deleted` }))
    )
    
    .group('/moderator', app => app
      .use(requireRole(['admin', 'moderator']))
      .get('/reports', () => ({ reports: ['Report 1', 'Report 2'] }))
      .post('/moderate', () => ({ message: 'Content moderated' }))
    )
  )
  .listen(3000)
```

## Step 4: Advanced JWT with Refresh Tokens

Let's implement a more secure JWT system with access and refresh tokens.

```typescript
import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'

interface User {
  id: number
  username: string
  password: string
  role: string
  refreshTokens: string[]
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'password123', role: 'admin', refreshTokens: [] },
  { id: 2, username: 'user', password: 'userpass', role: 'user', refreshTokens: [] }
]

const ACCESS_TOKEN_EXPIRY = 15 * 60 // 15 minutes
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 // 7 days

const authSystem = new Elysia()
  .use(jwt({ 
    name: 'accessJwt',
    secret: 'access-token-secret'
  }))
  .use(jwt({
    name: 'refreshJwt', 
    secret: 'refresh-token-secret'
  }))
  .use(cookie())
  .derive(async ({ accessJwt, cookie: { accessToken } }) => {
    if (!accessToken) {
      return { user: null, isAuthenticated: false }
    }

    try {
      const payload = await accessJwt.verify(accessToken)
      const user = users.find(u => u.id === payload?.sub)
      return {
        user,
        isAuthenticated: !!user
      }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  })

const app = new Elysia()
  .use(authSystem)
  
  .post('/login', async ({ body, accessJwt, refreshJwt, cookie: { accessToken, refreshToken } }) => {
    const { username, password } = body as { username: string, password: string }
    
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const accessTokenValue = await accessJwt.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY
    })

    const refreshTokenValue = await refreshJwt.sign({
      sub: user.id,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRY
    })

    // Store refresh token
    user.refreshTokens.push(refreshTokenValue)

    accessToken.set({
      value: accessTokenValue,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXPIRY,
      path: '/'
    })

    refreshToken.set({
      value: refreshTokenValue,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRY,
      path: '/'
    })

    return { 
      message: 'Login successful', 
      user: { id: user.id, username: user.username, role: user.role },
      expiresIn: ACCESS_TOKEN_EXPIRY
    }
  })

  .post('/refresh', async ({ refreshJwt, accessJwt, cookie: { refreshToken, accessToken } }) => {
    if (!refreshToken) {
      throw new Error('Refresh token required')
    }

    try {
      const payload = await refreshJwt.verify(refreshToken)
      const user = users.find(u => u.id === payload?.sub)
      
      if (!user || !user.refreshTokens.includes(refreshToken)) {
        throw new Error('Invalid refresh token')
      }

      const newAccessToken = await accessJwt.sign({
        sub: user.id,
        username: user.username,
        role: user.role,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY
      })

      accessToken.set({
        value: newAccessToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXPIRY,
        path: '/'
      })

      return { message: 'Token refreshed', expiresIn: ACCESS_TOKEN_EXPIRY }
    } catch {
      throw new Error('Invalid refresh token')
    }
  })

  .post('/logout', ({ cookie: { accessToken, refreshToken } }) => {
    const refreshTokenValue = refreshToken.value
    
    if (refreshTokenValue) {
      // Remove refresh token from user's token list
      users.forEach(user => {
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshTokenValue)
      })
    }

    accessToken.remove()
    refreshToken.remove()
    return { message: 'Logged out successfully' }
  })

  .get('/protected', ({ user, isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    return { message: 'Access granted', user }
  })
  .listen(3000)
```

## Step 5: Permission-Based Authorization

Let's implement a more granular permission-based system instead of just roles.

```typescript
import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'

interface Permission {
  id: string
  name: string
  resource: string
  action: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
}

interface User {
  id: number
  username: string
  password: string
  roleIds: string[]
  directPermissions: string[]
}

// Permission definitions
const permissions: Permission[] = [
  { id: 'users:read', name: 'Read Users', resource: 'users', action: 'read' },
  { id: 'users:write', name: 'Write Users', resource: 'users', action: 'write' },
  { id: 'users:delete', name: 'Delete Users', resource: 'users', action: 'delete' },
  { id: 'posts:read', name: 'Read Posts', resource: 'posts', action: 'read' },
  { id: 'posts:write', name: 'Write Posts', resource: 'posts', action: 'write' },
  { id: 'reports:read', name: 'Read Reports', resource: 'reports', action: 'read' }
]

// Role definitions
const roles: Role[] = [
  { 
    id: 'admin', 
    name: 'Administrator', 
    permissions: ['users:read', 'users:write', 'users:delete', 'posts:read', 'posts:write', 'reports:read'] 
  },
  { 
    id: 'moderator', 
    name: 'Moderator', 
    permissions: ['posts:read', 'posts:write', 'reports:read'] 
  },
  { 
    id: 'user', 
    name: 'Regular User', 
    permissions: ['posts:read'] 
  }
]

const users: User[] = [
  { id: 1, username: 'admin', password: 'password123', roleIds: ['admin'], directPermissions: [] },
  { id: 2, username: 'moderator', password: 'modpass', roleIds: ['moderator'], directPermissions: ['users:read'] },
  { id: 3, username: 'user', password: 'userpass', roleIds: ['user'], directPermissions: [] }
]

// Helper function to get user permissions
function getUserPermissions(user: User): string[] {
  const rolePermissions = user.roleIds.flatMap(roleId => {
    const role = roles.find(r => r.id === roleId)
    return role ? role.permissions : []
  })
  
  return [...new Set([...rolePermissions, ...user.directPermissions])]
}

const permissionSystem = new Elysia()
  .use(jwt({ name: 'jwt', secret: 'your-secret-key' }))
  .use(cookie())
  .derive(async ({ jwt, cookie: { auth } }) => {
    if (!auth) {
      return { user: null, isAuthenticated: false, permissions: [] }
    }

    try {
      const payload = await jwt.verify(auth)
      const user = users.find(u => u.id === payload?.sub)
      
      if (!user) {
        return { user: null, isAuthenticated: false, permissions: [] }
      }

      const userPermissions = getUserPermissions(user)
      
      return {
        user,
        isAuthenticated: true,
        permissions: userPermissions,
        hasPermission: (permission: string) => userPermissions.includes(permission),
        hasAnyPermission: (perms: string[]) => perms.some(p => userPermissions.includes(p)),
        hasAllPermissions: (perms: string[]) => perms.every(p => userPermissions.includes(p))
      }
    } catch {
      return { user: null, isAuthenticated: false, permissions: [] }
    }
  })

// Middleware factories
const requirePermission = (permission: string) => new Elysia()
  .use(permissionSystem)
  .onBeforeHandle(({ isAuthenticated, hasPermission }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    if (!hasPermission(permission)) {
      throw new Error(`Permission '${permission}' required`)
    }
  })

const requireAnyPermission = (permissions: string[]) => new Elysia()
  .use(permissionSystem)
  .onBeforeHandle(({ isAuthenticated, hasAnyPermission }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    if (!hasAnyPermission(permissions)) {
      throw new Error(`One of these permissions required: ${permissions.join(', ')}`)
    }
  })

const app = new Elysia()
  .use(permissionSystem)
  
  .post('/login', async ({ body, jwt, cookie: { auth } }) => {
    const { username, password } = body as { username: string, password: string }
    
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = await jwt.sign({
      sub: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    })

    auth.set({ value: token, httpOnly: true, maxAge: 3600, path: '/' })
    
    const userPermissions = getUserPermissions(user)
    return { 
      message: 'Login successful', 
      user: { id: user.id, username: user.username },
      permissions: userPermissions
    }
  })

  .get('/me', ({ user, isAuthenticated, permissions }) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    return { user, permissions }
  })

  // Permission-based routes
  .group('/api', app => app
    .group('/users', app => app
      .use(requirePermission('users:read'))
      .get('/', () => ({ users: users.map(u => ({ id: u.id, username: u.username })) }))
      
      .use(requirePermission('users:write'))
      .post('/', () => ({ message: 'User created' }))
      
      .use(requirePermission('users:delete'))
      .delete('/:id', ({ params }) => ({ message: `User ${params.id} deleted` }))
    )
    
    .group('/posts', app => app
      .use(requireAnyPermission(['posts:read', 'posts:write']))
      .get('/', () => ({ posts: ['Post 1', 'Post 2'] }))
      
      .use(requirePermission('posts:write'))
      .post('/', () => ({ message: 'Post created' }))
    )
    
    .group('/reports', app => app
      .use(requirePermission('reports:read'))
      .get('/', () => ({ reports: ['Report 1', 'Report 2'] }))
    )
  )
  .listen(3000)
```

## Step 6: Production-Ready Implementation

Finally, let's create a production-ready implementation with proper error handling, rate limiting, and security measures.

```typescript
import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'
import { rateLimit } from '@elysiajs/rate-limit'
import { cors } from '@elysiajs/cors'

// Environment configuration
const config = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'access-secret-change-in-production',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-in-production',
  ACCESS_TOKEN_EXPIRY: 15 * 60, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60, // 7 days
  BCRYPT_ROUNDS: 12,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000 // 15 minutes
}

interface User {
  id: number
  username: string
  passwordHash: string
  role: string
  isActive: boolean
  refreshTokens: string[]
  loginAttempts: number
  lockedUntil?: Date
  lastLogin?: Date
  createdAt: Date
}

// Mock database (use real database in production)
const users: User[] = []

// Security utilities
class SecurityUtils {
  static async hashPassword(password: string): Promise<string> {
    // In production, use bcrypt: return await bcrypt.hash(password, config.BCRYPT_ROUNDS)
    return `hashed_${password}`
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    // In production, use bcrypt: return await bcrypt.compare(password, hash)
    return hash === `hashed_${password}`
  }

  static isAccountLocked(user: User): boolean {
    return !!(user.lockedUntil && user.lockedUntil > new Date())
  }

  static async lockAccount(user: User): Promise<void> {
    user.lockedUntil = new Date(Date.now() + config.LOCKOUT_DURATION)
    user.loginAttempts = 0
  }

  static async recordFailedLogin(user: User): Promise<void> {
    user.loginAttempts += 1
    if (user.loginAttempts >= config.MAX_LOGIN_ATTEMPTS) {
      await this.lockAccount(user)
    }
  }

  static async recordSuccessfulLogin(user: User): Promise<void> {
    user.loginAttempts = 0
    user.lockedUntil = undefined
    user.lastLogin = new Date()
  }
}

// Custom error classes
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthorizationError'
  }
}

// Authentication service
class AuthService {
  static async login(username: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    const user = users.find(u => u.username === username)
    
    if (!user || !user.isActive) {
      throw new AuthenticationError('Invalid credentials')
    }

    if (SecurityUtils.isAccountLocked(user)) {
      throw new AuthenticationError('Account temporarily locked due to too many failed login attempts')
    }

    const isValidPassword = await SecurityUtils.verifyPassword(password, user.passwordHash)
    
    if (!isValidPassword) {
      await SecurityUtils.recordFailedLogin(user)
      throw new AuthenticationError('Invalid credentials')
    }

    await SecurityUtils.recordSuccessfulLogin(user)

    // Generate tokens (implement actual JWT signing)
    const accessToken = `access_${user.id}_${Date.now()}`
    const refreshToken = `refresh_${user.id}_${Date.now()}`
    
    user.refreshTokens.push(refreshToken)
    
    return { user, accessToken, refreshToken }
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Implement actual refresh token validation
    const userId = this.extractUserIdFromRefreshToken(refreshToken)
    const user = users.find(u => u.id === userId)
    
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      throw new AuthenticationError('Invalid refresh token')
    }

    const accessToken = `access_${user.id}_${Date.now()}`
    return { accessToken }
  }

  static async logout(userId: number, refreshToken?: string): Promise<void> {
    const user = users.find(u => u.id === userId)
    if (user && refreshToken) {
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
    }
  }

  private static extractUserIdFromRefreshToken(token: string): number {
    // Implement actual token parsing
    const parts = token.split('_')
    return parseInt(parts[1])
  }
}

// Main application
const authMiddleware = new Elysia({ name: 'auth' })
  .use(jwt({ name: 'jwt', secret: config.JWT_ACCESS_SECRET }))
  .use(cookie())
  .derive(async ({ headers, cookie: { accessToken } }) => {
    const token = accessToken || headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return { user: null, isAuthenticated: false }
    }

    try {
      // Implement actual JWT verification
      const userId = parseInt(token.split('_')[1])
      const user = users.find(u => u.id === userId && u.isActive)
      
      return {
        user,
        isAuthenticated: !!user
      }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  })
  .as('plugin')

const requireAuth = new Elysia()
  .use(authMiddleware)
  .onBeforeHandle(({ isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('Authentication required')
    }
  })

const requireRole = (role: string) => new Elysia()
  .use(requireAuth)
  .onBeforeHandle(({ user }) => {
    if (user?.role !== role) {
      throw new AuthorizationError('Insufficient permissions')
    }
  })

const app = new Elysia()
  .use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  }))
  .use(rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000 // 15 minutes
  }))
  .use(authMiddleware)
  
  // Error handling
  .onError(({ code, error, set }) => {
    console.error('Error:', error)
    
    if (error instanceof AuthenticationError) {
      set.status = 401
      return { error: 'Authentication failed', message: error.message }
    }
    
    if (error instanceof AuthorizationError) {
      set.status = 403
      return { error: 'Authorization failed', message: error.message }
    }
    
    if (code === 'VALIDATION') {
      set.status = 400
      return { error: 'Validation failed', message: error.message }
    }
    
    set.status = 500
    return { error: 'Internal server error' }
  })

  // Authentication endpoints with rate limiting
  .group('/auth', app => app
    .use(rateLimit({
      max: 5,
      windowMs: 5 * 60 * 1000 // 5 attempts per 5 minutes
    }))
    
    .post('/login', async ({ body, cookie: { accessToken, refreshToken } }) => {
      const { username, password } = body as { username: string, password: string }
      
      const result = await AuthService.login(username, password)
      
      accessToken.set({
        value: result.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: config.ACCESS_TOKEN_EXPIRY,
        path: '/'
      })

      refreshToken.set({
        value: result.refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: config.REFRESH_TOKEN_EXPIRY,
        path: '/'
      })

      return {
        message: 'Login successful',
        user: {
          id: result.user.id,
          username: result.user.username,
          role: result.user.role
        },
        expiresIn: config.ACCESS_TOKEN_EXPIRY
      }
    }, {
      body: t.Object({
        username: t.String({ minLength: 3, maxLength: 50 }),
        password: t.String({ minLength: 6 })
      })
    })

    .post('/refresh', async ({ cookie: { refreshToken, accessToken } }) => {
      if (!refreshToken) {
        throw new AuthenticationError('Refresh token required')
      }

      const result = await AuthService.refreshToken(refreshToken)
      
      accessToken.set({
        value: result.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: config.ACCESS_TOKEN_EXPIRY,
        path: '/'
      })

      return { message: 'Token refreshed', expiresIn: config.ACCESS_TOKEN_EXPIRY }
    })

    .post('/logout', async ({ user, cookie: { accessToken, refreshToken } }) => {
      if (user) {