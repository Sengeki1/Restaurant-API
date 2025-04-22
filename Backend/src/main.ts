import express from "express";
import { PrismaClient } from "./model/generated/prisma";
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis do .env

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Get all users
app.get("/", async (req, res) => {
  const userCount = await prisma?.order?.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database."
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});