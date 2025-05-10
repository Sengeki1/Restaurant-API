Inside the prisma folder (src/model/prisma)
To generate a prisma client for the database

```bash
    npx prisma generate --name init
```

To make migrations (update database)

```bash
    npx prisma migrate dev
```

To run the docker-compose which will setup the database

```bash
    docker compose up -d
```