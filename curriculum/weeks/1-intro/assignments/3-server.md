# Tic Tac Toe on a Server

## [Repo Link](https://github.com/fractal-bootcamp/assignment-3-databases)

## Overview

Our goal is to make our Tic-Tac-Toe use online multiplayer. Right now, the entire game runs
in each player's browser (aka. "on the client"), making this impossible. By introducing a _server_,
we can make the first step towards managing the game state outside of our clients.

When a player loads the page or makes a move, instead of changing the Tic Tac Toe game state
themselves, they make requests to an Express server, powered by an HTTP API.

## Prework
- (~20 min) [Promises & Asynchronous Programming](https://eloquentjavascript.net/11_async.html)
- Also complete the prework for the second day 3 assignment [here](./3-databases.md).


## Requirements

Your app:
 - maintains all the functionality it had in the in-browser version (feel free to add more if you have time).
 - runs on a server using `express` and `vite-express` by following Step 3 onward in 
 [this tutorial](https://github.com/szymmis/vite-express?tab=readme-ov-file#fresh-setup-with-create-vite)
 - `bun dev` runs `bun run --watch server.ts`
 - identifies games by their `id`, which uses a [`uuid`](https://www.npmjs.com/package/uuid)
 - has a new `interface` called `TicTacToeApi` 
    - 3 functions: create a game, make a move, and get a game by ID
    - return `Promise` and use `async/await` as needed
 - `TicTacToeApi` has two implementations:
    - a server implementation, using an in-memory data structure to store and manage games
    - a client implementation, using [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to 
    communicate with the sever
 - `TicTacToeApi` has a good set of tests that can run against the in-memory version of the API
 - Our express server has new routes that receieve requests made
 using `fetch` on the client

 ## Bonus
 Your app:
- is prettier and has animations, sound effects, etc.
- gracefully handles slow internet connections when connections are very slow
    - use Chrome's [Network Throttling](https://www.debugbear.com/blog/chrome-devtools-network-throttling) to slow down your internet connection and see how the user experience degrades
    - use [useOptimistic](https://react.dev/reference/react/useOptimistic) so the UI updates even when requests are very slow