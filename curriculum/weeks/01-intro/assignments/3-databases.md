# Databases

## [Repo Link](https://github.com/fractal-bootcamp/assignment-3-databases)

## Overview

Our goal is to make our Tic-Tac-Toe multiplayer. Right now, the entire game runs
in each player's browser (aka. "on the client"), making this impossible. We have it running in a server, but it is in-memory,
and we want it to be stored safely in a database instead.

By the end of this assignment, our tic-tac-toe app will be functionally identical,
but the game state will be managed entirely on a centralized server that we control, backed by a database.

Each player will communicate with that server when they want to make a move that changes the game, and the server
will write that data to our database.

This will allow us to make our game truly online and multiplayer in the next assignment.

## Prework
- (~10 min) [What is a database?](https://www.whalesync.com/blog/an-intro-to-databases)
    - You can ignore the stuff about Whalesync, but we are going to use Supabase!
- (~1 hour) Learn basic SQL by completing [Chapter 1 and 2 here.](https://www.executeprogram.com/courses/sql).
- Also complete the prework from [the first day 3 assignment.](https://github.com/fractal-bootcamp/bootcamp-monorepo/edit/main/curriculum/weeks/1-intro/assignments/3-server.md)

## Requirements

Your app:
- maintains all the functionality it had in the in-browser version (feel free to add more if you have time).
- communicates with a server running [Express.js](https://expressjs.com/en/starter/hello-world.html) using an API.
- runs a [PostgreSQL](https://www.postgresql.org/about/) database hosted by [Supabase](https://supabase.com/).
- uses [Drizzle.js](https://orm.drizzle.team/docs/overview) on the server for communicating with and managing your database.
- has 3 implementations of a `TicTacToeApi`
    - an in-memory implementation, for use on the server 
    - an implementation that makes requests to the server, used by the browser
    - an implementation that communicates with a database
- stores and updates all game state associated with each game in the server and database, not the client
- has tests for `TicTacToeApi` that pass for both the in-memory and database implementations

# Bonus

Your app:
- connects to a test database in Supabase when running locally, so you don't pollute your "prod" database (we will deploy to prod later)
- is prettier and has animations, sound effects, etc.
- gracefully handles slow internet connections when connections are very slow
    - use Chrome's [Network Throttling](https://www.debugbear.com/blog/chrome-devtools-network-throttling) to slow down your internet connection and see how the user experience degrades
    - use [useOptimistic](https://react.dev/reference/react/useOptimistic) so the UI updates even when requests are very slow
