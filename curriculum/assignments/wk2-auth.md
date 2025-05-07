# **Authentication (2 days)**

[https://github.com/fractal-bootcamp/jakezegil.express-app-day4](https://github.com/fractal-bootcamp/jakezegil.express-app-day4)

## Practice

*Include your Practice completion (and any notes) in your status report (in addition to the 3 PRs).*  
*Each day’s practice is estimated to take \~30 minutes. Don’t get rabbitholed on these.*

- Day 1: [Javascript Arrays Level 1-2](https://www.executeprogram.com/courses/javascript-array)  
- Day 2: [Javascript Arrays Level 3-4](https://www.executeprogram.com/courses/javascript-array)

## Reading

[https://thecopenhagenbook.com/](https://thecopenhagenbook.com/)

## Lecture Code

## Overview

You will implement (3x) email/password authentication using firebase, Cookies and JWT, and Clerk.  
[Please read the Copenhagen book.](https://thecopenhagenbook.com/)

## Core Concepts

- Firebase Authentication  
- JWT (JSON Web Tokens)  
- Cookies  
- Remix Auth

## Features

For each Auth implementation, integrate the following:

- Request Middleware  
- Client-Side Log In, Log Out, Sign Up

1. Set up an express server that takes a username and password and returns the user  
2. Setup an express server that exchanges username and password for a JWT and sends that  
3. Setup an express server that uses Clerk

- [ ] Custom Username/Password Auth  
      - [ ] Request Middleware  
      - [ ] Client Side Authed Requests  
- [ ] Custom JWT Auth  
      - [ ] Middleware  
      - [ ] Client side hookup  
      - [ ] BONUS: sent the JWT in the Cookie as well  
- [ ] Clerk  
      - [ ] Middleware  
      - [ ] Client Side Routing

Bonus:

- [ ] Implement Authentication with [Clerk](https://clerk.com/docs/references/react/overview)  
      - [ ] Middleware  
      - [ ] Client Side hookup  
- [ ] Load and edit an authentication-gated user profile  
      - [ ] Eg. I can change my name if I’m logged in  
- [ ] Add OAuth provider (sign in with Google, Github)  
- [ ] Add magic-link sign in

## Resources

- YOU MUST READ THIS: The Copenhagen Book, A Guide To Auth \-- [https://thecopenhagenbook.com/](https://thecopenhagenbook.com/)  
- What is a JWT? \- [Docs](https://jwt.io/introduction)  
- Cookies in Web Development: MDN Web Docs \- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)  
- Clerk Documentation \= [React \+ Express](https://clerk.com/docs/references/react/overview)  
- Middleware in Express \- [https://expressjs.com/en/guide/using-middleware.html\#middleware.router](https://expressjs.com/en/guide/using-middleware.html#middleware.router)  
- [Adding auth in express using AuthJS](https://authjs.dev/reference/express)
