## Job collector microservice

Microservice to collect job postings and write them into the database. 


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

```bash
# reuse prisma schema of parent directory
npx prisma generate --schema=./../prisma/schema.prisma
```