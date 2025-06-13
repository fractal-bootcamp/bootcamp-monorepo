# TRPC

## Overview

Right now, our client communicates with the server by fetching pages and making requests to API endpoints (hosted at `/api/...`). In the past, like with our Tic Tac Toe app, we have let our client use the API by using `fetch()`, and passing in the correct path and parameters. We are going to use a proper library to do this all of us instead, called tRPC.

Once we have TRPC, we will migrate all our API calls to use it (right now, just `/api/chat`). 

Then, we will implement a sidebar for our chatbot, listing all the chats the user has created. We will fetch that data using tRPC.

## Instructions

### Read up on tRPC

- Watch [Chris Bautista: Making typesafe APIs easy with tRPC](https://www.youtube.com/watch?v=2LYM8gf184U)
- Read about [tRPC concepts](https://trpc.io/docs/concepts)
- (optional) more technical deep dive: [How tRPC really works](https://www.youtube.com/watch?v=x4mu-jOiA0Q)

### **Install TRPC**
- `create-t3-app` already did this for you. Verify that you have some file called `trpc.ts`.
- If you somehow didn't do this, you could follow [this guide](https://trpc.io/docs/client/react/server-components).

### **Check your understanding**
- Make sure you have really clear answers. Write down your answer, or chat with an LLM, or one of your instructors.
 - Why would we use this instead of plain ol' APIs and `fetch()`? What does it get us?
 - At a high level, how does tRPC work under the hood? If servers and clients can only speak in HTTP requests, how does tRPC communicate with our server?

### **Use the tRPC client**
- Let's make sure we can use tRPC _at all_.
- `create-t3-app` created an example procedure in `src/server/api/routers/post.ts` called `hello`. It works very similarly to the `greeting` from the video above. Create a new `page.tsx` somewhere in your app and make sure you can call `hello` from your react client component. It should return, roughly, `Hello ${input.text}`
- If you're stuck, refer to the video!

### **Add Authentication**
- Our tRPC routes aren't authenticated! Anyone could call anything!
- We can hook them into BetterAuth. We would like every single request to
    1. fail if there isn't authentication information.
    2. suppy the current user info to every single tRPC procedure.
- we can do this using tRPC context ([details](https://trpc.io/docs/server/context)).
- you may have installed `NextAuth` when you ran `create-t3-app`. You will have to rip it out. If you chose `BetterAuth`, this might already work as expected.
- update `createTRPCContext` in `trpc.ts` to add a `user` object to the context:
```
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const authSession = await auth.api.getSession({
    headers: opts.headers
  })

  return {
    db,
    user: authSession?.user
  }
}
```
- add a new `protectedProcedure` to match `publicProcedure` in `trpc.ts`:
```
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
      ctx: {
        user: ctx.user
      }
    })
```
- check your understanding. Where did `ctx.user` come from?
- change `post.hello` to use `protectedProcedure`, and to use the `ctx.user` instead of the name from the input. You will return something like
```
      return {
        greeting: `Hello ${ctx.user.name}!`,
      };
```
- wire this all up and watch as tRPC seems to magically know the user's name, without us needing to explicitly pass it in the input to `hello`!

### Add database.getChats

- Add a function that, given a `userId`, can fetch a list of all the chat IDs for that user from the database.
- Implementation left as an exercise to the reader.

### Add a new procedure: `chat.list`
- Now, we need to make a sidebar to list the user's chats.
- create `src/server/api/routers/chat.ts`
- use the example in `post.ts` to add `chat.list` and wire it into `root.ts`. 
- `chat.list` should take no arguments and return all the data needed to render a sidebar with the user's chats.
- Here is an example implementation:
```
    list: protectedProcedure
        .input(z.void())
        .output(z.array(z.string()))
        .query(async ({ ctx, input }) => {
            const chats = await database.getChats(ctx.user.id);
            return chats;
        })
```

### Add a sidebar
- This sidebar needs to fetch a list of all the chats.
- You can do this two ways:
    1. do this client side using `useQuery`, like we do for the `hello` procedure above.
    2. do this server side, in a Server Component, like so:
```
import { api } from "~/trpc/server";
...
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const chats = (session?.user.id) ? await api.chat.list() : [];
  return (
    // implementation of ChatSidebar left as an exercise to the reader
     <ChatSidebar chats={chats} />
  )
```
- check your understanding of next.js. What is the mechanical difference between the two? why would you do one instead of the other? Write down your answer, or chat with an LLM, or one of your instructors.

### Add `chat.get` and `chat.create`
- Replace any other way you were getting or creating chats with a call to this tRPC client instead. It can route through the database like it did before.
- This works on both the server and client side!

### (Bonus) Add `chat.delete`
- This should work just like the other chat endpoints.
- Tricky detail: the sidebar should automatically update when a chat is deleted


### (Bonus) Migrate `useChat` to use tRPC
- `useChat` also just calls an endpoint on your server, right? `/api/chat`! Make it use the tRPC defined routes instead.
- create a new procedure, `chat.append` or something similar.
- Unfortunately we can't use the `api` trpc client directy. but we can configure `useChat` to make an identical request.
- See [docs here](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#request-configuration) on how to make `useChat` do that.
- Getting response streaming working is tricky. Talk to an instructor.

## Example Repo
- Use this for inspiration. Don't copy/paste! Make sure you understand what each individual line is doing!
- https://github.com/fractal-bootcamp/assignment-trpc