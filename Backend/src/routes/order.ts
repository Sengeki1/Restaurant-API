import { PrismaClient } from "../model/generated/prisma";
import { middleware } from "../controllers/controller";

const prisma = new PrismaClient();

export const menu = async (req, res) => {
  try {
    await prisma.$transaction(async () => {
      const orders = await prisma.order.findMany();
      res.send(orders);
    });
  } catch (error) {
    throw console.log(error);
  }
};

export const orders = async (req, res) => {
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
        } else {
          await prisma.order.create({
            data: obj,
          });
        }
      });
      return res.status(200).send("Order(s) created successfully!");
    });
  } catch (error) {
    throw console.log(error);
  }
};

export const deleteOrder = async (req, res) => {
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
};

export const patchOrder = async (req, res) => {
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
};