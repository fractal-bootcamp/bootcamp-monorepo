# Deployment Environments

Almost all web software runs in multiple deployment environments. Developers don't connect up their testing
or local devlopment infrasturcture to their production database -- they might break it! 

Instead, we create multiple environments to isolate our production environment (real users and data) from
our test environment (for developers to use as they please).

## Instructions

1. Follow the guide to [use the postgres docker container locally](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/).
    - Alternatively, use a new, separate supabase project/instance
2. Set the URL to the test database in `.env.local`
3. Run `bun drizzle-kit generate` and `migrate`
    - In the future, the `--env` flag can be used to point `bun`/`drizzle-kit` at the `.env` or `.env.local` configuration
4. (Bonus) set up [Vercel Preview Deploys](https://vercel.com/docs/git#preview-branches)