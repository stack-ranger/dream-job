## Dream job app
With this application you can find suitable jobs based on your favorite techstack.
You can also do a reverse search, which means you can see which skills are most needed for certain jobs.

### Stack

The application is built with the following stack:
- Next.js
- Prisma (Postgres)
- tRPC
- TailwindCSS

### Setup
Install dependencies
```bash
yarn install
```

Create a .env.local file and add the following variables:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"
API_KEY="YOUR_API_KEY" #https://findwork.dev/api/jobs/
```

```bash
yarn prisma migrate dev --name init # sync with new db
yarn prisma db pull # sync with existing db
yarn prisma generate # create prisma client based on schema
```

### Run
```bash
yarn dev # start dev server on localhost:3000
yarn build # build for production
yarn start # start production server
yarn lint # run eslint
```

