# Complete Guide to Authentication Cookies in ElysiaJS with JWT

This comprehensive guide covers everything you need to know about implementing secure authentication using cookies and JWT tokens in ElysiaJS. We'll build a complete auth system with login, logout, and protected routes.

## Table of Contents

1. [Understanding Cookies and HTTP Headers](#understanding-cookies-and-http-headers)
2. [Project Setup](#project-setup)
3. [Basic Cookie Implementation](#basic-cookie-implementation)
4. [JWT Authentication with Cookies](#jwt-authentication-with-cookies)
5. [Complete Auth System](#complete-auth-system)
6. [Security Best Practices](#security-best-practices)
7. [Advanced Implementation](#advanced-implementation)

## Understanding Cookies and HTTP Headers

Before diving into the code, let's understand what happens with cookies and HTTP headers:

### What Are Cookies?
Cookies are small pieces of data stored by the browser and sent with every HTTP request to the same domain. They're perfect for authentication because:
- They persist across browser sessions
- They're automatically sent with every request
- They can be secured with flags like `httpOnly`, `secure`, and `sameSite`

### HTTP Headers That Get Created
When we set cookies in ElysiaJS, several HTTP headers are involved:

```
// When setting a cookie:
Set-Cookie: authToken=eyJhbGciOiJIUzI1NiI...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

// When browser sends cookie back:
Cookie: authToken=eyJhbGciOiJIUzI1NiI...
```

## Basic Cookie Implementation

Let's start with a simple example to understand how cookies work in ElysiaJS:

```typescript:src/basic-cookies.ts
import { Elysia } from 'elysia'
import { cookie } from '@elysiajs/cookie'

const app = new Elysia()
  .use(cookie()) // This plugin enables cookie handling
  .get('/set-cookie', ({ cookie }) => {
    // Setting a basic cookie
    // This creates: Set-Cookie: username=john; Path=/
    cookie.username.set({
      value: 'john',
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/',
      httpOnly: false // Allow JS access for this example
    })
    
    return 'Cookie set! Check browser dev tools -> Application -> Cookies'
  })
  .get('/read-cookie', ({ cookie }) => {
    // Reading the cookie value
    // Browser automatically sends: Cookie: username=john
    const username = cookie.username.value
    
    if (!username) {
      return 'No username cookie found'
    }
    
    return `Hello ${username}! Your cookie was automatically sent by the browser.`
  })
  .get('/delete-cookie', ({ cookie }) => {
    // Deleting a cookie
    // This creates: Set-Cookie: username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
    cookie.username.remove()
    
    return 'Cookie deleted!'
  })
  .listen(3000)

console.log('🍪 Basic cookies server running on http://localhost:3000')
```

## JWT Authentication with Cookies

Now let's implement JWT authentication using cookies. This is more secure than storing JWTs in localStorage.

```typescript:src/jwt-auth.ts
import { Elysia, t, file } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'

// Configuration - In production, use environment variables!
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'your-super-secret-cookie-key-change-in-production'

// Mock user database (use a real database in production)
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' }
]

const app = new Elysia()
  // Enable CORS with credentials for cookie support
  .use(cors({
    origin: true, // In production, specify your domain
    credentials: true // CRITICAL: This allows cookies to be sent cross-origin
  }))

  // JWT plugin setup
  .use(jwt({
    name: 'jwt', // This creates a 'jwt' object in context
    secret: JWT_SECRET, // Secret for signing/verifying tokens
  }))

  // Cookie plugin setup
  .use(cookie({
    secret: COOKIE_SECRET, // Optional: for signed cookies
    secure: false, // Set to true only in production with HTTPS
    httpOnly: true, // Prevent XSS attacks (default for auth cookies)
    sameSite: 'lax' // Changed from 'strict' to 'lax' for better development experience
  }))

  // HOME PAGE - Serve the HTML file
  .get('/', () => file('index.html'))

  // LOGIN ROUTE
  .post('/login', async ({ body, jwt, cookie, set }) => {
    console.log('🔐 [AUTH] Login attempt received')
    console.log('📥 [REQUEST] Body:', body)

    const { username, password } = body as { username: string, password: string }

    // Find user in our mock database
    const user = users.find(u => u.username === username && u.password === password)

    if (!user) {
      console.log('❌ [AUTH] Invalid credentials for username:', username)
      set.status = 401
      return 'Invalid username or password'
    }

    console.log('✅ [AUTH] User authenticated:', user.username)

    // Create JWT payload
    const jwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
      // Add expiration (this will be in the JWT payload)
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour from now
    }

    console.log('🔑 [JWT] Creating token with payload:', jwtPayload)

    // Sign the JWT token
    const token = await jwt.sign(jwtPayload)
    console.log('✅ [JWT] Token created successfully')

    // Set the auth cookie
    cookie.authToken.set({
      value: token,
      httpOnly: true,
      secure: false, // Set to true only in production
      sameSite: 'lax', // Better for development
      maxAge: 60 * 60,
      path: '/'
    })

    console.log('🍪 [COOKIE] Auth cookie set')

    return `Login successful! Welcome ${user.username} (${user.role}).

🍪 Cookie Details:
- A secure, HttpOnly cookie named 'authToken' has been set
- This cookie will be automatically sent with all future requests
- It contains a JWT token with your user information
- It expires in 1 hour

🔒 Security Features:
- HttpOnly: Prevents XSS attacks (JavaScript cannot access the cookie)
- SameSite=Lax: Prevents CSRF attacks
- Secure flag will be enabled in production (HTTPS only)

Try clicking "Check Profile" to see the protected route in action!`
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String()
    })
  })

  // PROFILE ROUTE
  .get('/profile', async ({ cookie, jwt, set }) => {
    console.log('🔒 [PROTECTED] Profile route accessed')

    const authToken = cookie.authToken.value
    console.log('🍪 [COOKIE] Auth token received:', authToken ? 'Present' : 'Missing')

    if (!authToken) {
      console.log('❌ [AUTH] No auth token found in cookie')
      set.status = 401
      return 'Authentication required. Please log in first.'
    }

    try {
      console.log('🔍 [JWT] Verifying token...')
      const payload = await jwt.verify(authToken)

      if (!payload) {
        console.log('❌ [JWT] Token verification failed')
        cookie.authToken.remove()
        set.status = 401
        return 'Invalid token. Please log in again.'
      }

      console.log('✅ [JWT] Token verified successfully')

      const user = users.find(u => u.id === payload.userId)

      if (!user) {
        console.log('❌ [USER] User not found')
        cookie.authToken.remove()
        set.status = 401
        return 'User no longer exists. Please log in again.'
      }

      return `🎉 Profile Access Granted!

👤 User Information:
- ID: ${user.id}
- Username: ${user.username}
- Role: ${user.role}

🔑 JWT Token Information:
- User ID: ${payload.userId}
- Issued for: ${payload.username}
- Role: ${payload.role}
- Expires: ${new Date(payload.exp * 1000).toLocaleString()}

🍪 Cookie Information:
- The cookie was automatically sent by your browser
- It contains the JWT token used for authentication
- This happens on EVERY request to this domain

🔒 Security Notes:
- This route is protected and requires a valid JWT token
- The token was automatically extracted from the httpOnly cookie
- If the token was invalid or expired, you'd be redirected to login`

    } catch (error) {
      console.log('❌ [JWT] Token verification error:', error)
      cookie.authToken.remove()
      set.status = 401
      return 'Token verification failed. Please log in again.'
    }
  })

  // LOGOUT ROUTE  
  .post('/logout', ({ cookie }) => {
    console.log('🚪 [AUTH] Logout requested')
    cookie.authToken.remove()
    console.log('🍪 [COOKIE] Auth cookie removed')

    return `Logout successful!

🍪 Cookie Status:
- The authToken cookie has been removed
- Your browser will no longer send the authentication token
- You'll need to log in again to access protected routes

🔒 Security Notes:
- The cookie is immediately invalidated
- Any attempts to access protected routes will fail
- This is a secure way to handle logout in cookie-based auth`
  })

  // ERROR HANDLING
  .onError(({ code, error, set }) => {
    console.log('❌ [ERROR]', code, error.message)

    if (code === 'VALIDATION') {
      set.status = 400
      return 'Validation error: Please check your input'
    }

    if (code === 'NOT_FOUND') {
      set.status = 404
      return 'Route not found'
    }

    set.status = 500
    return 'Internal server error'
  })

  .listen(3005)

console.log('🚀 Server running on http://localhost:3005')
console.log('🔐 Try logging in with: admin/admin123 or user/user123')
console.log('🍪 Watch the browser dev tools to see cookies being set!')

export default app
```

```html:src/index.html
<!DOCTYPE html>
<html>

<head>
    <title>ElysiaJS Auth Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .form-group {
            margin: 10px 0;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        button {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }

        button:hover {
            background: #0056b3;
        }

        .response {
            margin: 20px 0;
            padding: 15px;
            border-radius: 4px;
        }

        .success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }

        .error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }

        .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
        }

        pre {
            white-space: pre-wrap;
        }
    </style>
</head>

<body>
    <h1>🔐 ElysiaJS Authentication with Cookies & JWT</h1>

    <div class="info">
        <h3>Test Credentials:</h3>
        <p><strong>Admin:</strong> username: admin, password: admin123</p>
        <p><strong>User:</strong> username: user, password: user123</p>
    </div>

    <h2>Login</h2>
    <form id="loginForm">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
    </form>

    <div id="response"></div>

    <h2>Actions</h2>
    <button onclick="checkProfile()">Check Profile (Protected Route)</button>
    <button onclick="logout()">Logout</button>

    <script>
        // Login form handler
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // CRITICAL: Include cookies in request
                    body: JSON.stringify(data)
                });

                const result = await response.text();
                document.getElementById('response').innerHTML =
                    '<div class="' + (response.ok ? 'success' : 'error') + '"><pre>' + result + '</pre></div>';

                if (response.ok) {
                    // Clear form on success
                    e.target.reset();
                }
            } catch (error) {
                document.getElementById('response').innerHTML =
                    '<div class="error">Error: ' + error.message + '</div>';
            }
        });

        // Check profile (protected route)
        async function checkProfile() {
            try {
                const response = await fetch('/profile', {
                    credentials: 'include' // CRITICAL: Include cookies in request
                });
                const result = await response.text();
                document.getElementById('response').innerHTML =
                    '<div class="' + (response.ok ? 'success' : 'error') + '"><pre>' + result + '</pre></div>';
            } catch (error) {
                document.getElementById('response').innerHTML =
                    '<div class="error">Error: ' + error.message + '</div>';
            }
        }

        // Logout
        async function logout() {
            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                    credentials: 'include' // CRITICAL: Include cookies in request
                });
                const result = await response.text();
                document.getElementById('response').innerHTML =
                    '<div class="' + (response.ok ? 'success' : 'error') + '"><pre>' + result + '</pre></div>';
            } catch (error) {
                document.getElementById('response').innerHTML =
                    '<div class="error">Error: ' + error.message + '</div>';
            }
        }
    </script>
</body>

</html>
```

## Security Best Practices

Here are the key security considerations when implementing cookie-based authentication:

### 1. Cookie Security Flags

```typescript
// ALWAYS use these flags for auth cookies
cookie.authToken.set({
  value: token,
  httpOnly: true,    // Prevents XSS - JavaScript cannot access
  secure: true,      // HTTPS only in production
  sameSite: 'strict', // Prevents CSRF attacks
  maxAge: 3600,      // Set appropriate expiration
  path: '/'          // Limit scope if needed
})
```

### 2. Token Expiration

```typescript
// Short-lived access tokens
const ACCESS_TOKEN_EXPIRY = 15 * 60 // 15 minutes

// Longer-lived refresh tokens
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 // 7 days

// Always include exp claim in JWT
const payload = {
  userId: user.id,
  exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY
}
```

### 3. Secure Secret Management

```typescript
// Use environment variables
const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_SECRET = process.env.COOKIE_SECRET

// Use strong, random secrets in production
// Generate with: openssl rand -hex 32
```

### 4. CORS Configuration

```typescript
.use(cors({
  origin: ['https://yourdomain.com'], // Specific domains in production
  credentials: true, // Required for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

### 5. Error Handling

```typescript
.onError(({ code, error, set, cookie }) => {
  // Clear potentially compromised cookies on auth errors
  if (code === 'UNAUTHORIZED' || code === 'FORBIDDEN') {
    cookie.accessToken?.remove()
    cookie.refreshToken?.remove()
  }
  
  // Don't leak sensitive information
  set.status = 401
  return 'Authentication failed'
})
```

This comprehensive guide covers everything you need to implement secure, production-ready authentication with cookies and JWT in ElysiaJS. The examples show exactly what HTTP headers and cookies are created, and include detailed logging so you can see the entire authentication flow in action.

Remember to always use HTTPS in production, implement proper error handling, and follow security best practices for storing and managing secrets.
