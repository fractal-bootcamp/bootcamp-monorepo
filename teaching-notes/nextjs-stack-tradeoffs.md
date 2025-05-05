# Teaching Tradeoff: One Stack vs Multiple Stacks

## Core Dilemma

In a limited 3-month software engineering bootcamp, we face a fundamental tension:

- **Desire for breadth**: Students benefit from exposure to multiple tech stacks as their career will involve continuous learning and adaptation.
- **Need for depth, speed, and progress**: Students require **mastery** of at least one stack to actually learn how web development works by delivering valuable, powerful projects. They can transfer this deep understanding to other stacks via metaphor, even if they develop some magical beliefs. Also, AI trends mean that learning new tech is much easier than before.

## Current Approach and Rationale as of Apr 4, 2025

We have decided (for now) to focus primarily on a core serverless stack (NextJS) with necessary exceptions where its limitations require alternative approaches.

### Why a Core Serverless Stack

1. **Efficiency in teaching**: One tool, one stack, one set of opinions reduces cognitive load for students
2. **Production-ready deployment**: Platforms like Vercel and Netlify make cloud deployment straightforward, optimized, and cached/served at the edge. Integration with other cloud providers makes extensibility easy.
3. **Industry relevance**: Serverless architecture (NextJS specifically) is increasingly becoming the default starting point for SaaS and AI startups, our target market.
4. **Speed of development**: Serverless approaches enable rapid prototyping and iteration
5. **AI-augmented development**: With AI tools reducing the friction of learning new technologies, mastering core principles becomes more valuable than breadth of technical knowledge
6. **Community of Knowledge**: Though this risks a bandwagon effect, popular youtubers like t3.gg provide TONS of useful resources for Next.JS developers. Many of our students already watch theo, as his videos are very enjoyable. We get to benefit from all his teaching work.

### Known Limitations of NextJS/Serverless

While NextJS provides a comprehensive framework for many web applications, several limitations necessitate introducing server-based alternatives:

1. **Websockets**: NextJS/Vercel does not natively support websockets, requiring either third-party solutions or a server.

2. **Long-running processes**: Serverless functions typically have execution time limits, making persistent operations challenging

3. **Background processing**: Tasks that need to run on schedules or respond to events without user interaction

4. **Resource-intensive computation**: Operations requiring significant CPU/memory that might hit serverless limits

5. **File system operations**: Serverless functions generally lack persistent file systems

6. **Stateful applications**: Some applications benefit from in-memory state management only practical on persistent servers

7. **Direct database access**: Serverless environments often require database connections through APIs rather than direct connections. Some databases will require a long-running server.

## Moving Forward

Rather than teaching multiple stacks simultaneously or avoiding NextJS entirely, we will:

1. Develop a lecture that clearly explains "When You Might Need a Server"
   - Cover why, when, and how to make that decision
   - Suggest a TypeScript server stack alternative to Express.js (choose between eg: hono, elysia.js, deno, bun:serve, or good old fashioned Node:serve)

2. Create projects that expose students to server-based solutions for specific use cases (e.g., real-time applications requiring websockets)

3. Maintain focus on the core serverless stack while acknowledging its limitations

4. Prepare students for the reality that their careers will involve learning multiple stacks, while giving them the skills to adapt quickly

This approach balances our competing desires: avoiding "shotgun teaching" multiple technologies while still preparing students for the technological diversity they'll encounter throughout their careers.
