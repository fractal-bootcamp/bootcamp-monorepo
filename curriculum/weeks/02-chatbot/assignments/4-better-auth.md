# Authentication System with Better Auth

## Overview

Add a complete authentication system to your existing chatbot application using Better Auth. This will secure your chat functionality, provide user accounts, and enable personalized chat experiences with message history and user management.

Better Auth is a modern, type-safe authentication library that provides a great developer experience with built-in security best practices, session management, and multiple authentication providers.

## Core Concepts
- Authentication & Authorization
- Session Management
- API Security
- React Server Components
- Type Safety

## Features

A complete authentication system should have the following:

- [ ] **Authentication Backend**
  - [ ] Set up Better Auth with your existing Drizzle database
  - [ ] Configure authentication providers (Email/Password, Google, GitHub)
  - [ ] Generate authentication database schemas (users and sessions)

- [ ] **Frontend Authentication UI**
  - [ ] Beautiful sign-in/sign-up forms with proper validation
  - [ ] User profile management page
  - [ ] Session management (login/logout functionality)
  - [ ] Protected route middleware for chat functionality
  - [ ] Loading states and error handling for auth flows

- [ ] **Chat Integration**
  - [ ] Associate chat messages with authenticated users
  - [ ] Implement user-specific chat history
  - [ ] Add user avatars and display names to chat interface
  - [ ] Secure chat API endpoints with authentication checks

**Bonus Features:**

- [ ] **[Advanced Auth]** - Multiple authentication providers (Google, GitHub, Discord)
- [ ] **[User Management]** - Admin panel for user management
- [ ] **[Social Features]** - Public chat rooms, user profiles with bio/avatar upload
- [ ] **[Security]** - Rate limiting, suspicious activity detection, account lockout
- [ ] **[Analytics]** - User engagement tracking, chat usage analytics

## Technologies to Use

- **Authentication**: Better Auth
- **Database**: Drizzle ORM (already configured)
- **UI Components**: ShadCN/UI (already configured)
- **Styling**: Tailwind CSS 4 (already configured) 
- **Backend**: tRPC + Next.js App Router (already configured)
- **Type Safety**: TypeScript + Zod validation

## Implementation Steps

0. **(optional) Practice Better Auth**
   - Put [this tutorial video](https://www.youtube.com/watch?v=gzYTDGToYcw) on one monitor, and put your project and the docs on another, side by side.
   - Follow along the tutorial video, make a simple, vanilla [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) typescript app
   - The tutorial uses Drizzle ORM, Neon for serverless postgres, ShadCN, and Better Auth, so it is perfect for understanding the basics.
   - Once you have sign-in/sign-out working, try adding a couple protected routes.
   - This will all serve as the foundation for doing it in your own chatbot!
   - Okay now for your chatbot:

1. **Setup Better Auth**
   - Install Better Auth and configure with your Drizzle database
   - Set up environment variables for auth providers
   - Generate user/session tables using better auth

2. **Create Authentication Pages**
   - `/auth/signin` - Sign in form with email/password and social logins
   - `/auth/signup` - User registration with email verification
   - `/auth/forgot-password` - Password reset flow
   - `/profile` - User profile management

3. **Secure Existing Routes**
   - Protect `/chat` routes with authentication middleware
   - Update tRPC procedures to include user context
   - Modify chat functionality to be user-specific

4. **Enhanced Chat Features**
   - Update chat UI to show user information
   - Implement chat history per user
   - Add user avatars and display names

## Database Schema Updates

You'll need to extend your existing Drizzle schema with something like this, but remember that Better Auth can generate your auth schema for you,
if you use the drizzle adapter!

You'll need to update your existing chat table to include the userId.

```typescript
// Users table for Better Auth
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Update your existing chat table to include userId
export const chats = pgTable("chat", {
  // ... existing fields
  userId: text("userId").references(() => users.id).notNull(),
});
```

## UI/UX Requirements
- **Modern Design**: Use your existing design system but create polished auth forms
- **Responsive**: Authentication flows should work on mobile and desktop
- **User Feedback**: Clear error messages, loading states, success confirmations


## Testing Strategy

- [ ] Test all authentication flows (signup, signin, logout, password reset)
- [ ] Verify protected routes are properly secured
- [ ] Test social login providers
- [ ] Test edge cases (expired sessions, invalid tokens, etc.)

## Resources & Documentation
- [Better Auth & NextJS](https://www.youtube.com/watch?v=gzYTDGToYcw)
- [Better Auth Documentation](https://www.better-auth.com/)
- [Better Auth Drizzle Integration](https://www.better-auth.com/docs/integrations/drizzle)
- [Next.js Authentication Patterns](https://nextjs.org/docs/app/building-your-application/authentication)
- [Security Best Practices for Web Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## Example Implementation Structure
```
src/
├── app/
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── profile/page.tsx
│   └── middleware.ts (protect routes)
├── lib/
│   └── auth.ts (Better Auth configuration)
├── server/
│   └── auth/ (auth-related tRPC procedures)
└── components/
    └── auth/ (auth UI components)
```

This authentication system will transform your chatbot from a simple anonymous chat into a full-featured, secure application with user account and proper security.
