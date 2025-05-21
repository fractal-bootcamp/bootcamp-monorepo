# Databases for Multi-Client Game

## Overview

Databases are a fundamental part of most applications. For the multi-client game, we'll use a database to persist game state and user information. This assignment focuses on setting up the database and defining a simple, effective schema for our game using Drizzle ORM, tailored for lobby functionality and two-player games.

## Core Concepts

- Data Modelling
- Migrations
- ORMs (Drizzle ORM)
- Database Relationships
- JSONB for flexible game state storage

## Features

Set up your database using Drizzle ORM and PostgreSQL. Implement the following:

- [ ] **Model a database with the following entities:**
    - [ ] **User**
    - [ ] **Game**

- [ ] **Relationships between the entities should meet the following requirements:**
    - [ ] A `User` can be `player1Id` in many `Game`s (i.e., can create multiple games).
    - [ ] A `User` can be `player2Id` in many `Game`s (i.e., can join multiple games).
    - [ ] A `Game` must have a `player1Id`.

- [ ] **Database Operations & Migrations:**
    - [ ] Run migrations to create the database schema using Drizzle Kit.
    - [ ] Write a TypeScript script using Drizzle ORM to:
        - [ ] Create a new `User`.
        - [ ] Create a new `Game` with the new `User` as `player1Id`, `player2Id` as `NULL`
    - [ ] Write a TypeScript script using Drizzle ORM to:
        - [ ] Simulate a second `User` joining a "waiting_for_player" game (update `player2Id` and `status` to "in_progress").
        - [ ] Update the `gameState` of that game (e.g., record a first move, set `currentPlayerId` in the JSONB).

Bonus:
- [ ] Create a separate test database using Docker Compose.
- [ ] And then go ahead and make your docker DB using `supabase local` instead of your own image
- [ ] Use environment variables or separate Drizzle configurations to manage connections to development and test databases.
- [ ] Implement basic user authentication (e.g., registration and login) using the `User` table.

## Resources

- Boilerplate: Consider starting with a simple ElysiaJS + Drizzle setup. (e.g., `bun create elysia app-name` then add Drizzle)
- Docker: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Postgres: [https://www.postgresql.org/about/](https://www.postgresql.org/about/)
- Drizzle ORM Documentation: [https://orm.drizzle.team/docs](https://orm.drizzle.team/docs)
- ElysiaJS WebSockets (for game communication): [https://elysiajs.com/patterns/websocket.html](https://elysiajs.com/patterns/websocket.html)

VSCODE Extensions:

- Docker extension
- Prisma (useful for `.prisma` syntax highlighting if you explore it, but Drizzle is the focus)
- Postico 2 or pgAdmin (for direct DB inspection)

Install these things globally:

- Docker Desktop
- Bun

In your project:

- Install Drizzle ORM and Drizzle Kit: `bun add drizzle-orm pg` and `bun add -d drizzle-kit`
- Configure Drizzle Kit (e.g., `drizzle.config.ts`).
- Generate migrations: `bunx drizzle-kit generate:pg`
- Apply migrations: `bunx drizzle-kit push:pg` (for development) or `bunx drizzle-kit migrate` (for production-style migrations)
- ^ **Crucially, read the Drizzle ORM documentation on schema definition, migrations, and querying!**
- You can use Bun to run TypeScript scripts: `bun run ./path/to/your_script.ts`
- ^ **Read the Bun documentation on running scripts and managing dependencies.**

## Inspiration

- [Install Postgres with Docker Compose](https://medium.com/@agusmahari/docker-how-to-install-postgresql-using-docker-compose-d646c793f216)
- [Drizzle ORM Examples](https://orm.drizzle.team/learn/examples)
- [SQL Cheat Sheet](https://www.sqltutorial.org/sql-cheat-sheet/)
- Install Bun: [https://bun.sh/docs/installation](https://bun.sh/docs/installation)
- [Running TypeScript files with Bun](https://bun.sh/docs/runtime/typescript#running-ts-and-tsx-files)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

Stuff To Learn:
[Learn SQL](https://www.executeprogram.com/courses/sql) (Highly recommended for understanding database fundamentals).
