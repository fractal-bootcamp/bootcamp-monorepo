### Next.js “Real-Time Chatroom” Mock-Interview Challenge  
*(approx. 90 min hands-on + 30 min discussion)*  

---

#### 0. Problem Statement (candidate-facing)
> Build a **minimal, production-quality real-time chatroom** in Next.js. 
> - One room, infinite scroll upward (oldest→newest).  
> - Any visitor can post a message.  
> - Each message stores **userId**, **timestamp**, **text**.  
> - Messages propagate live to **all connected clients** without a manual refresh.  
> - Persist chat history in either  
>   - a local **JSON file** *or*  
>   - a **SQLite** database (your choice).  
> - Prioritise **simplicity, clarity, and UX polish** over feature count.

---

#### 1. Ground Rules

| |Must-Have|Can-Choose|Nice-to-Have (ignore if time-boxed)|
|---|---|---|---|
|Data layer|File I/O or SQLite|Prisma, Drizzle, or raw SQL|Migration scripts|
|Real-time transport|WebSocket|Socket.IO, tRPC, Pusher, Ably, Supabase-realtime|Optimistic UI, reconnection|
|State mgmt.|React state|SWR/React-Query/Zustand|Offline queue|
|Styling|Any method|Tailwind, CSS-in-JS, vanilla CSS|Dark/light toggle|
|Infinite list|Virtualised list|react-virtuoso, tanstack/virtuoso|Day-headers, scroll-to-bottom btn|

- **Use professional judgement**—pick libs you’d use at work and explain *why*.  
- You may stub authentication; generating a random UUID per browser session is enough.  
- Assume Node 18+, Edge Runtime capable. No serverless deployment required.  

---

#### 2. Candidate Deliverables

1. **Running app** (`npm run dev`) that satisfies the must-haves.  
2. **Readable code** (idiomatic TypeScript, typed models, lint passes).  
3. **README** covering: setup, design choices, trade-offs, and “if I had more time” notes.  

---

#### 3. Evaluation Rubric (0-3 each → 27 pts total)

|Area|Key questions|
|---|---|
|**Correctness**|All must-have behaviours observable?  
|**Simplicity**|Is the solution as simple as possible? Simple, clean code. A simple system design. Minimal scope to meet the requirements. Minimal complexity.|
|**Code Cleanliness**|Consistent style, descriptive names, small components, no dead code, good comments to explain confusing elements. Good library choices.|
|**UX Quality**|Smooth infinite scroll, auto-scroll on new message, focus handling, mobile?|
|**Time/Scope Management**|Delivered a working slice first, documented stretch goals?|

*A perfect score does **not** require every stretch goal; clarity and execution trump bells & whistles.*

---

#### 4. Interview Flow

|Phase|Interviewer prompts|Signals sought|
|---|---|---|
|Kick-off (10 min)|“Walk me through how you’ll attack this.”|Requirements gathering, mental model, prioritisation|
|Coding (60-90 min, pair-friendly)|Silent or think-aloud at candidate’s preference.|Implementation skill, testing while coding|
|Demo & walk-through (10 min)|“Show a feature you’re proud of.”|Ownership, ability to explain code|
|Critique & extension (20 min)|“If prod traffic spikes 100×, what breaks first?”|Scalability instincts, creative thinking|
|Design-intent (10 min)|UI/UX: “Why this layout? Talk me through your empty state & loading micro-copy.”|User-centric reasoning, visual hierarchy|

---

#### 5. Suggested Follow-up Questions

1. **State vs. transport:** “Why a dedicated WebSocket layer instead of HTTP long-polling?”  
2. **Persistence trade-offs:** “Would IndexedDB be viable?”  
3. **Accessibility:** “How would you announce new messages for screen readers?”  
4. **Testing:** “Outline a Jest + React-Testing-Library test for message send failure.”  
5. **Future scope:** “Sketch a moderation feature; where does it hook into the current stack?”

---

#### 6. Interviewer Cheat-Sheet (common red flags)

|Symptom|Likely issue|Interview poke|
|---|---|---|
|Missing dependency array warnings|Improper React effects|“How often does that effect run?”|
|Massive single component|Poor separation|“Could this be split to improve reusability?”|
|Polling every second|Didn’t notice WebSocket|“What other realtime techniques exist?”|
|No error boundaries|UX gaps|“What does the user see if the DB is down?”|

---

#### 7. Stretch Ideas (only if asked)

- **Emoji or markdown** parsing.  
- **Rate-limit** abuse (debounce + server validation).  
- **Server Actions** (Next.js 14) + Turbopack for DB writes.  
- **Edge-cached** initial history using `app/edge.ts`.  

---

### URLs & References  
(ordered by probable usefulness to candidate)  

1. Next.js Documentation – App Router & Server Actions  
   https://nextjs.org/docs
2. Realtime Sync Engines -
   (convex)[https://docs.convex.dev/], (jazz)[https://jazz.tools/]
2. MDN WebSockets Guide  
   https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API  
3. TanStack Virtualised Lists  
   https://tanstack.com/virtual/latest  
4. Prisma with SQLite Quickstart  
   https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-sqlite  
5. WAI-ARIA Authoring Practices – Chat pattern  
   https://www.w3.org/WAI/ARIA/apg/patterns/chat/

*(All links verified 24 Apr 2025.)*