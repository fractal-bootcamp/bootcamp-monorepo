# Authentication & AI Chat API - Complete Example

A comprehensive Express.js application demonstrating authentication, authorization, and AI chat integration. This project implements the step-by-step learning progression from the authentication assignment.

## 🎯 Learning Objectives

This example demonstrates:
- **JWT-based Authentication** with secure token handling
- **Role-based Authorization** (admin vs basic users)  
- **AI Chat Integration** using Vercel AI SDK
- **Complete OpenAPI Documentation** with Swagger UI
- **Progressive Authentication Learning** from simple secrets to production-ready JWT

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` and add your configuration:

```env
# Required for AI chat features
OPENAI_API_KEY=your-openai-api-key-here

# Recommended for production
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Optional customization
PORT=3000
NODE_ENV=development
```

### 3. Start the Development Server

```bash
# Using bun
bun run dev

# Or using npm
npm run dev
```

### 4. Explore the API

1. **Visit the Homepage**: http://localhost:3000
2. **API Documentation**: http://localhost:3000/api-docs
3. **Health Check**: http://localhost:3000/health

## 🧪 Testing the API

### Test Users (Pre-configured)

| Username | Password | Role  | Description |
|----------|----------|-------|-------------|
| `admin`  | `admin123` | admin | Can access all protected endpoints |
| `user`   | `user123`  | basic | Can access user-level endpoints |

### Quick Test Sequence

1. **Test Public Endpoint** (no auth required):
```bash
curl http://localhost:3000/api/public
```

2. **Login to Get JWT Token**:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

3. **Use JWT Token for Protected Endpoint**:
```bash
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

4. **Test AI Chat** (requires OpenAI API key):
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

## 📚 Step-by-Step Learning Guide

This project demonstrates the **progressive learning approach** from the assignment:

### Steps 1-2: Basic API Structure
- ✅ Public endpoint (`/api/public`)
- ✅ "Protected" endpoint (initially public - demonstrates the problem)
- ✅ Basic Swagger documentation

### Steps 3-5: Authentication with Secrets
- ✅ In-memory user database with roles
- ✅ Secret-based authentication (`/api/protected/secret-demo`)
- ✅ Role-based authorization (admin only)

### Steps 6-7: Understanding JWT Problems
- ✅ Educational demo showing secret vulnerabilities
- ✅ Clear explanation of why JWTs are better

### Steps 8-10: JWT Implementation
- ✅ JWT signing and verification
- ✅ Login endpoint (`/api/login`)
- ✅ JWT-based authentication middleware

### Steps 11-12: Complete API
- ✅ AI chat endpoints with authentication
- ✅ User profile management
- ✅ Chat history management

### Step 13: Production Features
- ✅ Rate limiting
- ✅ Security headers
- ✅ Error handling
- ✅ Complete OpenAPI documentation

## 🔧 API Endpoints

### Authentication Endpoints
- `POST /api/login` - Login with username/password
- `POST /api/logout` - Logout and clear cookies
- `GET /api/public` - Public endpoint (no auth)
- `GET /api/protected` - Admin-only endpoint
- `GET /api/protected/secret-demo` - Educational secret-based auth

### AI Chat Endpoints
- `POST /api/chat` - AI chat completion
- `GET /api/chat/history` - Get user's chat history
- `DELETE /api/chat/history` - Clear user's chat history
- `GET /api/chat/test` - Test AI service connection

### User Management Endpoints
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/profile/stats` - Get user statistics

### Development Endpoints
- `GET /health` - Health check
- `GET /api/debug/database` - Database statistics
- `GET /api-docs` - Interactive API documentation
- `GET /api-docs.json` - OpenAPI specification

## 🏗️ Project Structure

```
src/
├── config/
│   ├── database.ts      # In-memory user database
│   └── swagger.ts       # OpenAPI specification
├── middleware/
│   └── auth.ts          # Authentication middleware
├── routes/
│   ├── auth.ts          # Authentication routes
│   ├── chat.ts          # AI chat routes
│   └── profile.ts       # User profile routes
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── jwt.ts           # JWT utility functions
└── index.ts             # Main application file
```

## 🔐 Authentication Flow

1. **User Login**: POST credentials to `/api/login`
2. **JWT Creation**: Server signs JWT with user info + expiration
3. **Token Storage**: JWT stored in HTTP-only cookie + returned in response
4. **Protected Requests**: Client sends JWT in `Authorization: Bearer <token>` header
5. **Token Verification**: Server verifies JWT signature and extracts user info
6. **Authorization**: Check user role for endpoint access

## 🤖 AI Chat Integration

The AI chat features use the **Vercel AI SDK** with OpenAI:

- **Streaming & Non-streaming** responses supported
- **Authentication required** for all chat endpoints
- **Per-user chat history** tracking
- **Usage statistics** and token counting
- **Error handling** for API failures

## 🛡️ Security Features

- **JWT Authentication** with secure signing
- **HTTP-only Cookies** to prevent XSS
- **Rate Limiting** (100 req/15min general, 10 req/15min auth)
- **Security Headers** via Helmet.js
- **CORS Configuration** for cross-origin requests
- **Input Validation** and sanitization
- **Error Handling** without information leakage

## 📖 Educational Value

### What Students Learn:

1. **Why Authentication is Hard**: Experience the problems with simple approaches
2. **JWT Benefits**: Understand expiration, statelessness, and security
3. **Progressive Enhancement**: Build from simple to production-ready
4. **Real-world Integration**: AI APIs, documentation, security
5. **Best Practices**: Error handling, validation, documentation

### Key Concepts Demonstrated:

- **Middleware Patterns** for authentication and authorization
- **Security by Design** with multiple layers of protection
- **API Documentation** as a first-class concern
- **Error Handling** and user experience
- **Production Readiness** considerations

## 🚀 Production Deployment

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=<strong-random-secret-256-bits>
OPENAI_API_KEY=<your-openai-key>
BETTER_AUTH_SECRET=<another-strong-secret>
```

### Recommended Additions for Production:
- Replace in-memory database with persistent storage (PostgreSQL, MongoDB)
- Add user registration endpoint
- Implement password hashing (bcrypt)
- Add email verification
- Set up proper logging (Winston, Pino)
- Add monitoring and health checks
- Configure reverse proxy (nginx)
- Set up SSL/TLS certificates

## 🔄 Next Steps

After understanding this example, students can:

1. **Implement Better Auth**: Replace custom JWT with Better Auth library
2. **Add OAuth Providers**: Google, GitHub sign-in
3. **Build Frontend**: React app with authentication
4. **Add Database**: Persistent user and chat storage
5. **Deploy to Production**: Vercel, Railway, or similar platforms

## 🐛 Troubleshooting

### Common Issues:

**Linter Errors**: Install dependencies first:
```bash
bun install  # This installs all @types/* packages
```

**AI Chat Not Working**: Add OpenAI API key to `.env`:
```env
OPENAI_API_KEY=sk-your-key-here
```

**JWT Errors**: Ensure JWT_SECRET is set:
```env
JWT_SECRET=your-secret-key-here
```

**CORS Issues**: Check if frontend URL is in CORS whitelist (src/index.ts)

## 📝 Assignment Implementation Checklist

This example implements all assignment requirements:

- ✅ **Express Server** with TypeScript
- ✅ **Authentication Middleware** (secret + JWT versions)
- ✅ **Protected API Endpoints** with role-based access
- ✅ **OpenAPI Documentation** with Swagger UI
- ✅ **AI Chat Integration** with Vercel AI SDK
- ✅ **JWT Implementation** with proper security
- ✅ **Rate Limiting** and security features
- ✅ **Step-by-step Progression** following assignment structure

## 🎉 Success Criteria

You'll know it's working when:

1. ✅ Server starts without errors
2. ✅ `/api-docs` shows complete API documentation
3. ✅ You can login and receive JWT tokens
4. ✅ Protected endpoints reject unauthorized requests
5. ✅ AI chat works with valid OpenAI API key
6. ✅ All endpoints are documented and testable via Swagger UI

---

**Happy Learning! 🚀**

This example demonstrates production-ready authentication patterns while maintaining educational clarity. Use it as a reference for building secure, documented APIs with Express.js and TypeScript. 