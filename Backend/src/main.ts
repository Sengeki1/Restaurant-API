import express from "express";
import { PrismaClient } from "./model/generated/prisma";
import dotenv from 'dotenv';
import { middleware } from "./controllers/controller";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger/swagger"

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dotenv.config();

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get("/menu", async (req, res) => {
  try {
    await prisma.$transaction(async () => {
      const orders = await prisma.order.findMany();
      res.send(orders);
    });
  } catch (error) {
    throw console.log(error);
  }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *                 - type
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 type:
 *                   type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data supplied
 */
app.post("/orders", async (req, res) => {
  try {
    const data = await middleware(req.body);
    await prisma.$transaction(async () => {
      data.map(async (obj) => {
        const data = await prisma.order.findUnique({
          where: {
            name: obj.name,
          },
        });

        if (data) {
          await prisma.order.update({
            where: {
              id: data.id,
            },
            data: {
              ...data,
              deleted: null,
            },
          });
          return res.status(200).send("Order(s) created successfully!");
        }

        await prisma.order.create({
          data: obj,
        });
        return res.status(200).send("Order(s) created successfully!");
      });
    });
  } catch (error) {
    throw console.log(error);
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid ID supplied
 */
app.delete("/orders/:id", async (req, res) => {
  try {
    await prisma.$transaction(async () => {
      const order = await prisma.order.findFirst({
        where: {
          id: Number(req.params.id)
        }
      });
      if (!order) return res.status(400).send("Invalid id");

      const existingOrder = await prisma.order.findUnique({
        where: {
          name: order?.name,
          deleted: null
        }
      });

      if (existingOrder) {
        await prisma.order.delete({
          where: {
            id: existingOrder?.id
          }
        });
        return res.send("Successfully Deleted order");
      }
      return res.send("Order doesnt exists");
    });
  } catch (error) {
    throw console.log(error);
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *                 - type
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 type:
 *                   type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid ID or Data supplied
 */
app.patch("/orders/:id", async (req, res) => {
  try {
    const data = await middleware(req.body);
    await prisma.$transaction(async () => {
      const order = await prisma.order.findFirst({
        where: {
          id: Number(req.params.id)
        }
      });
      if (!order) return res.status(400).send("Invalid id");

      const existingOrder = await prisma.order.findUnique({
        where: {
          name: order?.name,
          deleted: null
        }
      });

      if (existingOrder) {
        await prisma.order.update({
          where: {
            id: existingOrder?.id
          },
          data: {
            ...data[0],
            deleted: null,
          },
        });
        return res.send("Successfully Updated order");
      }
      return res.send("Order doesnt exists or it is duplicate");
    });
  } catch (error) {
    throw console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});