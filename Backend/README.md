# Restaurant Order System - Backend

This is the **Backend** for the **Restaurant Order System**. It's built using **Node.js**, **Prisma**, **JWT**, and **bcrypt**.

## Technologies Used

- **Node.js** with **TypeScript**
- **Prisma** ORM for database management
- **JWT** (JSON Web Tokens) for authentication
- **bcrypt** for password hashing
- **Express** for routing

---

## Prerequisites

Before running the backend, ensure you have the following installed:

- **Node.js** (version 16+)
- **npm** or **yarn**
- **Prisma** (used as an ORM for database interaction)
- **Docker**

---

## Installation

1. Clone the repository:

   ```bash
        git clone https://github.com/Sengeki1/Restaurant-API.git
        cd Restaurant-API/backend
   ```

2. Install the dependencies

    ```bash
        npm install
    ```

3. Start the development server

    ```bash
        npm start
    ```

## Note

To set up the database, we use Docker. Run the following command to bring up the database container:

```bash
    docker compose up -d
```

Inside the directory ``src/model/prisma``, generate the Prisma client for the database:

```bash
    npx prisma generate --name init
```

To apply database migrations (update schema):

```bash
    npx prisma migrate dev
```

We then need to create a Secret Key for JWT authentication. Open a Node terminal and run the following command:

```bash
    require('crypto').randomBytes(64).toString('hex')
```

Copy the resulting secret and paste it into the ``.env`` file, specifically in the ``JWT_TOKEN`` variable

```bash
    JWT_TOKEN=your-generated-secret-key
```
