# Personal AI Assistant

## Overview

Create a personal AI chatbot interface that allows users to have conversations, manage chat sessions, and store chat history locally. The app should be built with Next.js using the T3 stack and Vercel's AI SDK. Use SQLite with DrizzleORM for local data storage.

### Example from LibreChat

[link](https://librechat-librechat.hf.space/c/new)
![image](https://github.com/user-attachments/assets/df663db2-62fa-48a8-b182-cc07fa3b0dc8)

## Core Concepts

* Next.js App Router
* Vercel AI SDK
* Local data persistence
* Real-time streaming
* Type safety

## Features

### Chat Interface

* Real-time message streaming using Vercel AI SDK
* Local message storage using DrizzleORM + SQLite
* 1 Main Chat Page:
  * Chat Sessions List in left sidebar
  * Active Chat Thread in the Main Window (or New Chat thread if you're at /new)
  * Model Selection & Other Settings in some dropdown or modal

### Chat Sessions List

* Create new chat sessions
* View existing sessions
* Components:
  * Session Card
  * New Session Button
  * Session List

### Active Chat Thread

* Real-time message streaming
* Message persistence
* Components:
  * Message Bubble
  * Chat Input
  * Loading States
  * Error States

### Settings

* AI model selection
* Theme settings (lightmode / darkmode)

## Bonus Features

* Message search
* Custom chat personas
* Voice input/output
* Chat summarization
* File attachments

## Technologies to Use

### Required Stack

* Frontend - `bun create t3-app@latest`
  * Next.js
  * TypeScript
  * Tailwind CSS
  * tRPC
* Database
  * DrizzleORM
  * SQLite
* AI Integration
  * Vercel AI SDK

## Resources

* [Next.JS AI Cookbook Examples](https://sdk.vercel.ai/cookbook)
* [Next.JS Ai ChatBot Playground Example Code](https://sdk.vercel.ai/playground/anthropic:claude-v3-sonnet)
* [Next.js Documentation](https://nextjs.org/docs)
* [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
* [DrizzleORM Documentation](https://orm.drizzle.team/docs/overview)
* [T3 Stack Documentation](https://create.t3.gg/)
* [Open Source AI Chatbot](https://github.com/danny-avila/LibreChat)

## Tips

* Use the AI SDK's built-in hooks for managing chat state
* Leverage TypeScript for type safety across the full stack
* Use tRPC for type-safe API routes
* Start with basic chat functionality before adding advanced features
* Try to see if there are already templates for the chat interface out there, built with shadcn
