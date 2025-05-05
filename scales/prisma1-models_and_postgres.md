### Prisma Scale 1 - DB Basics (+ Docker)

1. Initialize a Typescript Project + Initialize Prisma
```sh
bun init
bunx prisma init
```

2. Add a User model and a Post model -- we're making a simple blog app
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts Post[]

  @@map("users")
}
```

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

3. Add a `docker-compose.yml` to create a POSTGRES Database:
```yml
version: "3.9"
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      DB_NAME: postgres
    command: -c fsync=off -c full_page_writes=off -c synchronous_commit=off -c max_connections=500
    ports:
      - 10002:5432
```

4. Run your database to make sure it works. If this doesn't work, make sure you install and run docker desktop.
```sh
docker compose up
```

5. create a .env file pointing to your database:

Template:
```sh
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Yours should look like this:
```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:10002/postgres"
```


6. Check out your database using psql
```sh
psql postgresql://postgres:postgres@localhost:10002/postgres
```

Then go ahead and see what tables exist
```sql
select * from 
```
and then press `tab` twice to see all your options

7. okay now migrate your DB
```sh
bunx prisma migrate dev
```

8. check your database again for your new tables

```sh
psql postgresql://postgres:postgres@localhost:10002/postgres
select * from 
```

9. Write the following functions:
- signupUser(email, name, password) -> User
- loginUser(email, password) -> User
- createPost(authorId, title, content) -> Post
- listPosts(authorId) -> Post[]
- deletePost(postId) -> void

10. Write a main() function which tests ALL your functions

11. Run your file and test it: `bun index.ts`

12. Check your database again:
```sh
psql postgresql://postgres:postgres@localhost:10002/postgres
```

```sql
select * from users;
select * from posts;
```