## Stack Ranger 

<img width="300px" height="auto" src="logo.png">

Tell us with which stack want to work with and we will find the jobs for you.
Or if you still know exactly which skills you should learn next, tell us about the job you are interested in and we will find the most relevant stack for you.

### Link to the app
https://stack-ranger.herokuapp.com/

### Tech Stack
The application is built with the following stack:
- Next.js
- Prisma 
- Postgres
- tRPC
- TailwindCSS

### Setup
Install dependencies
```bash
yarn install
```

Setup postgres database
```bash
docker run postgres -p 5432:5432
```

Create a .env.local file and add the following variables:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"
API_KEY="YOUR_API_KEY" #https://findwork.dev/api/jobs/

# Arbitrary string for the authorization header
AUTHORIZATION_HEADER="YOUR_AUTHORIZATION_HEADER" 

# Required for next-auth
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
```

Sync with the database
```bash
yarn prisma migrate dev --name init # sync with new db
yarn prisma db pull # sync with existing db
yarn prisma generate # create prisma client based on schema
```

#### Utils
A convenient way to interact with the database is to use the prisma studio
```bash
npx prisma studio
```

### Run
```bash
yarn dev # start dev server on localhost:3000
yarn build # build for production
yarn start # start production server
yarn lint # run eslint
```

### Trigger the microservice
Use the authorization header to trigger the microservice. (Note we used cron job via Gihub Actions to trigger )
```bash
curl --request GET \
          --url 'localhost:3000/api/microservice' \
        --header 'Authorization: <AUTHORIZATION_HEADER>'
```

### Grading
| Criteria                                       | Points |
|------------------------------------------------|--------|
| Regex                                         | 3      |
| CSS Tailwind                                   | 5      |
| Darkmode                                       | 5      |
| Chart.js                                       | 5      |
| Next.js (SSR)                                  | 20     |
| UI-Components                                  | 5      |
| Typescript                                     | 10     |
| tRPC                                           | 6      |
| Authorization                                  | 10     |
| Host own DB (Postgres)                         | 15     |
| Deploy server in Docker container              | 10     |
| Additional mirco-service (fetch jobs from API) | 10     |

### Additional potential points
- Prisma (Object relational mapping) for full type safety and independence from db changes
- Github Actions (build, deployment and cronjob)
- Endless scroll (no library)
- Auto suggestions for skill search on job search (no library)
- State management using Zustand

Made with ❤️ at KTH
