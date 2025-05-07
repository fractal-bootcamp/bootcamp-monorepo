# Basic Survey App

## Overview

Your goal today is to build a simple full-stack application (that means frontend AND backend AND database). You will be using ExpressJS/Hono/[ElysiaJS](https://elysiajs.com/) and React.

You may use Claude / ChatGPT to ask questions, but NOT to copy code. You cannot use Cursor or Github Copilot or any form of AI code-writer. Type every character of code yourself -- don’t even copy from the docs. You will be surprised how much muscle memory matters.

A survey app is exactly what it sounds like: an app to create surveys and collect anonymous survey results. It needs to:

- Create New Surveys  
- Show all Past Surveys, with links to “survey results” and “take this survey” screens,  
- Allow a user to take a survey, submit the survey, and see “success, thank you for submitting”.

YOU DO NOT NEED AUTHENTICATION FOR THIS APP.

A survey app covers a full stack application. Focus on getting the underlying functionality in place, and then clean up the UI/UX with Daisy/Tailwind.

## Core Concepts

- CRUD  
- Data Modelling  
- ORMs  
- React + Forms

## Features

Your Survey App should have the following, built with React, and the backend should be Express or Hono or [ElysiaJS](https://elysiajs.com/). If you’re not sure which to choose, pick ElysiaJS.

- [ ] 4 Views  
      - [ ] List of Surveys  
      - [ ] Survey Creation  
      - [ ] Survey Submission \+ Success Screen  
      - [ ] Survey Results  
- [ ] List of Existing Surveys  
      - [ ] Go to creation/submission/results  
      - [ ] Each survey should link to “take this survey” and “view results for this survey” pages  
- [ ] Survey Creation  
      - [ ] Be able to add multiple survey blocks (questions)  
      - [ ] Be able to update a survey block  
      - [ ] Be able to delete a survey block  
      - [ ] Generate a link to take the survey  
- [ ] Survey Submission  
      - [ ] Be able to respond (anonymously) to a survey (series of questions) and have your answer recorded  
      - [ ] All survey answers are freeform text responses  
- [ ] Survey Results  
      - [ ] View a list of responses

Bonus:

- [ ] Allow multiple survey block types (multiple choice, range, date)  
- [ ] Aggregate results in the Survey Results View  
- [ ] When a question is answered, minimize the survey block

How to create an ElysiaJS App:

- [Elysia Official Guide](https://elysiajs.com/)

React Router v7 [documentation](https://reactrouter.com/start/framework/installation)

How to create an Express App:

- [Express Official Guide](https://expressjs.com/en/starter/installing.html) (JS)  
- [Our guide, using Bun and adding Typescript support to an express server](https://gist.github.com/ajroberts0417/d7d557fedae1f3c4a356422162a011b5)

Technologies to Use

- A Typescript Server: [ExpressJS](https://expressjs.com/) or [Hono](https://hono.dev/) or [Elysia JS](https://elysiajs.com/)  
  - [https://github.com/fractal-bootcamp/database-boilerplate](https://github.com/fractal-bootcamp/database-boilerplate)  
    - Docker \+ Postgres  
  - [React router v7](https://reactrouter.com/start/framework/installation)

  Some useful commands:

- `bun create vite` -- for creating a frontend  
- `bun init` -- for creating a backend

## Deployment

- [Deploy React Router v7 on Netlify](https://developers.netlify.com/guides/how-to-deploy-a-react-router-7-site-to-netlify/)  
- [Deploy ElysiaJS on Railway](https://elysiajs.com/patterns/deployment.html#railway)  
- For your Production Database, you have a few options. All you need is a DB on the internet, with a DatabaseURL you can access. Here are 3 options:  
  - [On Railway](https://docs.railway.com/guides/postgresql) (I think free but idk)  
  - On [Supabase](https://supabase.com/) (free)  
  - On [Neon](https://neon.tech/) (also free)

##

## Resources

- [**Jake’s Repo From the Morning Demo**](https://github.com/fractal-bootcamp/jakezegil.express-app-day4)

## Inspiration
