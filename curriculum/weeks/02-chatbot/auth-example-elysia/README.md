# Authentication & AI Chat API - ElysiaJS Edition

A comprehensive, type-safe authentication and AI chat API built with **[ElysiaJS](https://elysiajs.com/)** - the fastest, most ergonomic TypeScript framework. This project demonstrates modern authentication patterns, AI integration, and production-ready API development with end-to-end type safety.

## 🌟 Why ElysiaJS?

This implementation showcases the advantages of ElysiaJS over traditional frameworks:

- **🚀 21x Faster than Express** - Superior performance with Bun runtime
- **🎯 End-to-End Type Safety** - No code generation, just pure TypeScript magic
- **📖 Built-in OpenAPI** - Auto-generated documentation from your code
- **🛡️ Runtime Validation** - Type-safe at compile AND runtime
- **🎨 Ergonomic Design** - Built for humans, not machines

## 🎯 Learning Objectives

This example demonstrates:
- **Type-Safe Authentication** with ElysiaJS JWT plugin
- **Built-in Documentation** with automatic OpenAPI generation
- **Modern Middleware Patterns** using ElysiaJS plugins
- **AI Integration** with Vercel AI SDK and type safety
- **Progressive Authentication Learning** from secrets to production JWT

## 🚀 Quick Start

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- **OpenAI API Key** (for AI chat features)

### 1. Install Dependencies

```bash
# Using bun (recommended for ElysiaJS)
bun install

# Or using npm
npm install
```

### 2. Environment Setup

```bash
cp env.example .env
```

Add your configuration to `.env`:

```env
# Required for AI features
OPENAI_API_KEY=your-openai-api-key-here

# Recommended for production
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Optional
PORT=3000
NODE_ENV=development
```

### 3. Start Development Server

```bash
# Using bun (optimal performance)
bun run dev

# Or using npm
npm run dev
```

### 4. Explore the API

- **🏠 Homepage**: http://localhost:3000
- **📚 API Documentation**: http://localhost:3000/swagger
- **🏥 Health Check**: http://localhost:3000/health

## 🧪 Testing the API

### Pre-configured Test Users

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| `admin`  | `admin123` | admin | Full API access |
| `user`   | `user123`  | basic | Limited access |

### Quick Test Commands

1. **Public Access** (no auth):
```bash
curl http://localhost:3000/api/public
```

2. **Login & Get JWT**:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

3. **Protected Access**:
```bash
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

4. **AI Chat** (requires OpenAI key):
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

## 🏗️ Project Structure

```
src/
├── types/
│   └── index.ts         # Type-safe schemas with ElysiaJS validation
├── database/
│   └── index.ts         # In-memory database with helper functions
├── middleware/
│   └── auth.ts          # Authentication plugins and middleware
├── routes/
│   ├── auth.ts          # Authentication endpoints
│   ├── chat.ts          # AI chat endpoints
│   └── profile.ts       # User profile management
└── index.ts             # Main application with auto-documentation
```

## 🔐 Authentication Architecture

### ElysiaJS Authentication Flow

1. **Plugin Setup**: JWT, Bearer, and Cookie plugins configured
2. **Type-Safe Middleware**: Authentication state typed throughout
3. **Automatic Validation**: Request/response validation with runtime checks
4. **Built-in Security**: CORS, rate limiting, secure cookies

### Middleware Layers

```typescript
// 🔓 Optional authentication
.use(optionalAuth)

// 🔒 Required authentication  
.use(requireAuth)

// 👑 Admin-only access
.use(requireAdmin)
```

## 🤖 AI Integration Features

- **Streaming & Non-streaming** chat responses
- **Per-user Chat History** with automatic persistence
- **Usage Tracking** and statistics
- **Error Handling** with graceful fallbacks
- **Type-Safe Validation** for all chat inputs

## 📖 Auto-Generated Documentation

ElysiaJS automatically generates comprehensive OpenAPI documentation:

- **Interactive Swagger UI** at `/swagger`
- **Complete Schema Documentation** from TypeScript types
- **Example Requests/Responses** with validation rules
- **Authentication Testing** directly in the UI

## 🎨 ElysiaJS-Specific Features

### Type-Safe Route Definitions

```typescript
.post('/api/login', async ({ body, jwt, cookie }) => {
  // body is automatically typed and validated
  const { username, password } = body
  // ... implementation
}, {
  body: LoginSchema,           // Input validation
  response: {                  // Output validation
    200: LoginResponseSchema,
    401: ErrorResponseSchema
  },
  detail: {                    // Auto-documentation
    summary: 'User login',
    tags: ['Authentication']
  }
})
```

### Plugin-Based Architecture

```typescript
// Authentication setup plugin
export const authSetup = new Elysia({ name: 'auth-setup' })
  .use(jwt({ name: 'jwt', secret: JWT_SECRET }))
  .use(bearer())
  .use(cookie())

// Reusable middleware plugin
export const requireAuth = new Elysia({ name: 'require-auth' })
  .use(authenticateJWT)
  .derive(({ user, set }) => {
    // Type-safe user context
  })
```

## 📊 Performance Comparison

Based on [TechEmpower Benchmark](https://www.techempower.com/benchmarks/):

| Framework | Requests/sec | vs Express |
|-----------|--------------|------------|
| **Elysia + Bun** | 2,454,631 | **21x faster** |
| Express + Node | 113,117 | 1x baseline |
| Fastify + Node | 415,600 | 3.7x faster |

## 🛡️ Security Features

- **JWT Authentication** with ElysiaJS JWT plugin
- **HTTP-only Cookies** for secure token storage
- **CORS Configuration** with credential support
- **Input Validation** with runtime type checking
- **Error Sanitization** (no info leakage in production)

## 📚 Educational Progression

This project follows the assignment's step-by-step learning path:

### Steps 1-2: Basic Structure
- ✅ Public and "protected" endpoints (initially both public)
- ✅ Built-in Swagger documentation

### Steps 3-5: Secret Authentication  
- ✅ In-memory user database with roles
- ✅ Secret-based auth (educational demo)
- ✅ Role-based authorization

### Steps 6-7: Understanding Problems
- ✅ Educational demo of secret vulnerabilities
- ✅ Clear JWT advantages explanation

### Steps 8-10: JWT Implementation
- ✅ ElysiaJS JWT plugin integration
- ✅ Type-safe authentication middleware
- ✅ Secure login/logout flow

### Steps 11-14: Production Features
- ✅ AI chat with authentication
- ✅ User profile management
- ✅ Complete API documentation
- ✅ Type-safe validation throughout

## 🚀 Production Deployment

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=<cryptographically-strong-secret>
OPENAI_API_KEY=<your-openai-key>
```

### Deployment Platforms
- **Bun Deploy**: Native ElysiaJS support
- **Railway**: Auto-detects Bun projects
- **Vercel**: Supports Bun runtime
- **Docker**: Use `oven/bun` base image

### Production Enhancements
```typescript
// Rate limiting with ElysiaJS
.use(rateLimit({
  duration: 60000,
  max: 100
}))

// Security headers
.use(helmet())

// Database integration
.use(database({
  provider: 'postgresql',
  url: process.env.DATABASE_URL
}))
```

## 🔄 Framework Comparison

### ElysiaJS vs Express

| Feature | ElysiaJS | Express |
|---------|----------|---------|
| **Performance** | 21x faster | Baseline |
| **Type Safety** | Built-in, end-to-end | Requires additional setup |
| **OpenAPI** | Auto-generated | Manual with swagger-jsdoc |
| **Validation** | Runtime + compile-time | Third-party libraries |
| **Developer Experience** | Ergonomic, intuitive | Verbose, complex middleware |
| **Bundle Size** | Smaller | Larger with dependencies |

### Migration Benefits

Students moving from Express learn:
- **Type-First Development** with automatic validation
- **Performance Optimization** with minimal effort
- **Documentation-Driven API** design
- **Modern JavaScript/TypeScript** patterns

## 🐛 Troubleshooting

### Common Issues

**Dependencies not found**:
```bash
bun install  # Installs all ElysiaJS packages
```

**OpenAI API not working**:
```bash
# Add your API key to .env
echo "OPENAI_API_KEY=sk-your-key-here" >> .env
```

**Port already in use**:
```bash
# Change port in .env
echo "PORT=3001" >> .env
```

**TypeScript errors**:
```bash
# Type-check without running
bun run type-check
```

## 📝 Assignment Checklist

This implementation covers all assignment requirements:

- ✅ **ElysiaJS Server** with TypeScript
- ✅ **Type-Safe Authentication** (secret + JWT)
- ✅ **Protected API Endpoints** with role-based access
- ✅ **Built-in OpenAPI** documentation with Swagger UI
- ✅ **AI Chat Integration** with Vercel AI SDK
- ✅ **Progressive Learning** structure following assignment steps
- ✅ **Production-Ready** patterns and security

## 🎉 Success Criteria

You'll know everything is working when:

1. ✅ Server starts with beautiful ElysiaJS banner
2. ✅ `/swagger` shows complete, interactive documentation
3. ✅ Login returns JWT token with type safety
4. ✅ Protected endpoints properly authenticate/authorize
5. ✅ AI chat responds with valid OpenAI API key
6. ✅ All requests/responses are type-checked automatically

## 🌟 Next Steps

After mastering this ElysiaJS example:

1. **Add Database**: Integrate with Prisma or DrizzleORM
2. **Real-time Features**: WebSocket chat with ElysiaJS WS plugin
3. **Frontend Integration**: Type-safe client with Eden Treaty
4. **Advanced Auth**: OAuth providers, magic links
5. **Deployment**: Deploy to production with Bun/ElysiaJS

---

**Built with ❤️ using ElysiaJS**

Experience the future of TypeScript web development with ElysiaJS - where type safety meets performance, and developer experience comes first.

## 📖 Resources

- **[ElysiaJS Documentation](https://elysiajs.com/)** - Complete framework guide
- **[Elysia Plugins](https://elysiajs.com/plugins/overview)** - Official plugin ecosystem
- **[Eden Treaty](https://elysiajs.com/eden/overview)** - End-to-end type safety for frontend
- **[The Copenhagen Book](https://thecopenhagenbook.com/)** - Authentication guide
- **[Vercel AI SDK](https://sdk.vercel.ai/docs)** - AI integration documentation 