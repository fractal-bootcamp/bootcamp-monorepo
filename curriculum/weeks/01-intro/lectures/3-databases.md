# Databases

## [Repo Link](https://github.com/fractal-bootcamp/assignment-3-databases)

## Lecture Notes

Lecture 1 -- Servers:
- morale / vibecheck
- rough plan for today, why are we bothering with a db?
- brief overview of databases
- install vite-express via [tutorial](https://github.com/szymmis/vite-express?tab=readme-ov-file#fresh-setup-with-create-vite)
- replace `bun dev` script with `bun run --watch server.ts`, check working
- create tic tac toe api: `api.ts`
- create first impl using a map: `in-memory-api.ts`
- go over [this server/client diagram](https://excalidraw.com/#json=HbRS2oYJyu9l1gLJcaMQP,w0hwrbKk2HyEUzjvWQC5hw)
- add tests for `in-memory-api.ts`
- add express endpoints (create, update, read)
- create `api-client.ts`
- integrate `api-client` into `App.tsx`, everything should work

Lecture 2 -- Database Implementation:
- follow Drizzle [supabase tutorial](https://orm.drizzle.team/docs/get-started/supabase-new)
- create `db-api.ts`
- swap over in-memory impl to db
- run tests, run server - hey it just works!