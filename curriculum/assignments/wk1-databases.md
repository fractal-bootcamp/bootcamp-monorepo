# **Databases**

## Overview

Databases are a fundamental part of most applications. Throughout the course, we’ll be using and abusing databases in every project.

## Core Concepts

- Data Modelling  
- Migrations  
- ORMs

## Features

Set up your database and do the following

- [ ] Model a database with the following entities  
      - [ ] Book (ID, Title, Author, ISBN)  
      - [ ] Author (ID, Name, Biography)  
      - [ ] Genre (ID, Name)  
      - [ ] Member (ID, Name, Email, Address)  
- [ ] Relationships between the entities should meet the following requirements  
      - [ ] Books can have many genres  
      - [ ] Members can rent many books at a time  
      - [ ] Authors can author many books  
- [ ] Run migrations
- [ ] Write a SQL Query to add a Book  
- [ ] Write a script that uses the Prisma client to add a Book  
- [ ] Write a script that uses the Prisma client to borrow a Book

Bonus:

- [ ] Create a second database using docker compose  
- [ ] Create a second prisma schema in the same project and apply it to the second database  
- [ ] Use [DrizzleORM](https://orm.drizzle.team/) instead of Prisma

## Resources

- Boilerplate: [https://github.com/fractal-bootcamp/database-boilerplate](https://github.com/fractal-bootcamp/database-boilerplate)   
- Docker: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)  
- Postgres: [https://www.postgresql.org/about/](https://www.postgresql.org/about/)  
- Prisma Documentation: [https://www.prisma.io/docs/orm/prisma-client/queries](https://www.prisma.io/docs/orm/prisma-client/queries)

VSCODE Extensions:

- Prisma extension  
- Docker extension

Install these things globally:

- Docker Desktop  
- Bun

In your project:

- \`npx prisma migrate dev\`  
- ^ but also, read the prisma docs\!  
- You can use bun to run scripts \-- \`bun run my\_db\_script.ts\`  
- ^ but also, read the bun docs\!

## Inspiration

- [Install Postgres with Docker Compose](https://medium.com/@agusmahari/docker-how-to-install-postgresql-using-docker-compose-d646c793f216)  
- [Modelling and Migrations with Prisma](https://blog.logrocket.com/effortless-database-schema-migration-prisma/)  
- [SQL Cheat Sheet](https://images.datacamp.com/image/upload/v1675360372/Marketing/Blog/SQL_Basics_For_Data_Science.pdf)  
- Install Bun: [https://bun.sh/](https://bun.sh/)  
- [Running a script in Typescript](https://jakezegil.substack.com/p/typescript-scripts-quickstart)  
- [https://www.postgresqltutorial.com/](https://www.postgresqltutorial.com/)

Stuff To Learn:  
[Learn SQL](https://www.executeprogram.com/courses/sql).  
