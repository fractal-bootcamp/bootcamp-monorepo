# Day 1: T3 App + Basic Chatbot

## Part 1: T3 App Setup
1. Create t3 app:
```bash
npx create-t3-app@latest my-chatbot
```
- Select: TypeScript, Next.js, Tailwind, tRPC, Drizzle

2. Local setup:
```bash
cd my-chatbot
npm install
npm run dev
```

3. Vercel deployment:
- Push to GitHub
- Import to Vercel
- Deploy

## Part 2: Basic Chatbot Implementation

1. Install dependencies:
```bash
npm install ai
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
```

2. Create `app/components/Chat.tsx`:
```tsx
'use client'
import { useChat } from 'ai/react'
 
export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
 
  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto">
        {messages.map(m => (
          <div key={m.id} className="mb-4">
            <strong>{m.role}: </strong>
            {m.content}
          </div>
        ))}
      </div>
 
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

3. Setup database:

See [drizzle docs](https://orm.drizzle.team/docs/overview)

```bash
bun run db:push
```

4. Follow the rest of the [AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot) tutorial documentation

### We have these features to build in our app in the next 2-3 days:
1. [Chatbot Tutorial](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
2. [Message Persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence)
3. [Tool Usage](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)
4. [Generative UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)
5. [Completions](https://ai-sdk.dev/docs/ai-sdk-ui/completion)
6. [Object Generation](https://ai-sdk.dev/docs/ai-sdk-ui/object-generation)
7. [RAG](https://ai-sdk.dev/docs/guides/rag-chatbot)
8. [Reading Images & PDFs](https://ai-sdk.dev/docs/guides/multi-modal-chatbot)
9. [Natural Language SQL Queries](https://ai-sdk.dev/docs/guides/natural-language-postgres)

It will be a lot of learning, and we'll be delivering lectures on the trickiest components as they come up.

## Part 3. Good Progress:
Complete these 3 sections on day 1:
1. [Chatbot Tutorial](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
2. [Message Persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence)
3. [Tool Usage](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)

Complete these 6 sections on day 2:

4. [Generative UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)

5. [Completions](https://ai-sdk.dev/docs/ai-sdk-ui/completion)

6. [Object Generation](https://ai-sdk.dev/docs/ai-sdk-ui/object-generation)

7. [RAG](https://ai-sdk.dev/docs/guides/rag-chatbot)

8. [Reading Images & PDFs](https://ai-sdk.dev/docs/guides/multi-modal-chatbot)

9. [Natural Language SQL Queries](https://ai-sdk.dev/docs/guides/natural-language-postgres)

On day 3, we will focus on improving our app with authentication and some more production features for users.


### Some interesting tools to help:
- [shadcn/ui](https://ui.shadcn.com/)


### Other things to look at:
- [Vercel's own AI Chatbot template](https://vercel.com/templates/ai/nextjs-ai-chatbot) their [github repo is here](https://github.com/vercel/ai-chatbot)
- Librechat, [github here](https://github.com/danny-avila/LibreChat) and [demo here](https://librechat-librechat.hf.space/c/new)
- [NextJS App Router tutorial](https://nextjs.org/learn) 
- [t3 chat](https://t3.chat/)
