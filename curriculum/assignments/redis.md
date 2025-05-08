# Redis Queues: Rate Limiting and Click Counting

## Overview

In this project, you will build a web application that uses Redis for two key functionalities: rate limiting and click counting. Redis will be employed as an in-memory data store to efficiently manage these tasks. The project will also include deployment to a platform like Railway or Render.

## Core Concepts

- Redis  
- Rate Limiting  
- Click Counting  
- Node.js  
- Deployment (Railway or Render)

## Features

Your setup should have the following:

- [ ] 1 View  
      - [ ] View of total global click count and ability to click  
- [ ] Rate Limiting  
      - [ ] Prevent each individual user from adding more than 10 clicks in 10 seconds  
      - [ ] Use a queue in Redis to store the request counts for each user  
- [ ] Click Counting  
      - [ ] Implement a task queue to handle click count as dispatched tasks  
- [ ] Deployment  
      - [ ] Deploy your app \+ redis to render or railway

## Bonus

- [ ] Build the backend in Go using Go Fiber  
- [ ] Implement [Caching](https://nextjs.org/docs/app/building-your-application/caching) in Next.JS for Next Routes

## Technologies to Use

- **Backend**: Node.js  
- **Database**: Redis  
- **Deployment**: Railway or Render

## Boilerplate

- Node.js  
- Express.js (optional, for API routing)  
- Redis client library (e.g., `ioredis`)

## Installation Instructions

- Node.js  
- Express.js (optional, for API routing)

## Inspiration

- [What is a redis queue?](https://redis.io/glossary/redis-queue/)  
- [Deploying Redis on Railway](https://docs.railway.app/guides/redis)  
- [Rate limiting with Redis](https://medium.com/@SaiRahulAkarapu/rate-limiting-algorithms-using-redis-eb4427b47e33)  
- [Go Fiber](https://github.com/gofiber/fiber)
