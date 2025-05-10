import { PrismaClient } from "../model/generated/prisma";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);

        if (user.email === "admin@123.com") {
            await prisma.$transaction(async () => {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        password: hashedPassword,
                        username: user.username,
                        role: 'admin',
                        deleted: null
                    }
                });    
            });

            const token = jwt.sign(
                { email: user.email, id: user.id, role: 'admin' }, 
                process.env.JWT_SECRET,           
                { expiresIn: '24h' }               
            );

            res.status(201).json({ token });
        } else {
            await prisma.$transaction(async () => {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        password: hashedPassword,
                        username: user.username,
                        role: 'user',
                        deleted: null
                    }
                });    
            });

            const token = jwt.sign(
                { email: user.email, id: user.id, role: 'user' }, 
                process.env.JWT_SECRET,           
                { expiresIn: '24h' }               
            );

            res.status(201).json({ token });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const validateUser = async (req, res) => {
    try {
        const user = req.body;
        await prisma.$transaction(async () => {
            const user_found = await prisma.user.findUnique({
                where: {
                    email: user.email,
                    deleted: null
                }
            });

            if (user_found) {
                const passwordMatch = await bcrypt.compare(user.password, user_found.password);
                
                if (!passwordMatch) {
                    return res.status(401).json({ error: "Invalid password" });
                }
                
                const token = jwt.sign(
                    { email: user.email, id: user.id, role: user_found.role },
                    process.env.JWT_SECRET,            
                    { expiresIn: '24h' }                
                );

                res.status(201).json({ token });
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}