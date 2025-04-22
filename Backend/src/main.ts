import express from "express";
import { PrismaClient } from "./model/generated/prisma";
import dotenv from 'dotenv';
import { middleware } from "./controllers/controller";
import swaggerUi from 'swagger-ui-express';
import Yaml from 'yamljs'

const app = express();
const prisma = new PrismaClient();
const swaggerDocument = Yaml.load('./swagger.yml');
const PORT = 3000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
dotenv.config();

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