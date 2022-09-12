## Job collector microservice

Microservice to collect job postings from findwork.dev and write them into the database. 

### Setup
```bash 
# install dependencies
yarn install

# compile ts -> js
yarn build 

# run the compiled js
yarn start 

# use ts-node to run without compilation
yarn dev
```

### Create Schema (reuse the schema of the root project)
```bash
# reuse prisma schema of parent directory
npx prisma generate --schema=./../prisma/schema.prisma
```

### Environment variables 

Make sure to add the following fields to the .env or export the environment variables.
```bash
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<IP>:<PORT>/<DB>?schema=<SCHEMA>"
API_TOKEN="<YOUR TOKEN>"
```

