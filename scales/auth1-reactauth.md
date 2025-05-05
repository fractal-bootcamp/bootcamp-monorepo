
## Client-side Authentication:
1. Create a React App (Vite) (SPA)

2. Add Clerk or Firebase or Supabase (AUTH PROVIDER)

3. Get Auth to work on the client (login, logout, conditional rendering based on loggedIn/loggedOut state)

---
## Securing your API so only Authenticated Clients can Access:

4. Add an API Server (express, fastapi, Go, Elixir, any server works)

5. Expose a protected endpoint (list a protected resource is a good example... e.g. list all of a user's posts at `/posts`)

6. (in `/posts`) verify the user token (this might involve decoding a JWT). If it is not valid, return 401 unauthorized error. If it is valid, return all of the user's posts.

7. If it's not working... make sure you are PASSING the user auth token correctly from the client on the request.


## BONUS: Middleware
8. refactor your authentication function so that it is middleware rather than a function that you call inside your endpoint (refer to express docs or Jake/Andrew if this makes no sense at all. Refer to express docs if this makes some sense.)



### Glossary:

Authentication Functions on Requests:
`authenticate(req) -> User` -- looking at the request's headers (specifically, cookies, but not always) and returning the User based on what is in those headers. OR throw an Unauthorized Error if there is no matching User for the request, or if the token is invalid or whatever.
`isAuthed(req) -> boolean` -- looks at the request's headers or at the request.user and returns true or false based on if it's authenticated.


Middleware:
`middlewareFunction(req, res, next) -> void` -- intended to perform side effects on the Request and Response. Although it's just a function so it can do any side effect obviously. In other words, modifies the Request and Response in any way the middleware wants.
When DONE, it calls `next()` to move the Request and Response to the next middleware in the pipeline.