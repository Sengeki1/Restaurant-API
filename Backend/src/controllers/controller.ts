import { Order } from "../model/model.dto";

export async function middleware(data: [Order] | Order): Promise<Order[]> {
    try {
        if (data) {
            if (Array.isArray(data))  {
            data.map(async obj => {
                if (typeof obj.name === "string" && obj.name.trim() === '') {
                    throw console.log("Name cannot be empty");
                }
                if (typeof obj.price === "number" && obj.price === 0) {
                    throw console.log("Price cant be 0");
                }
                if (typeof obj.type === "string" && obj.price === 0) {
                    throw console.log("type must be provided");
                }
            })
            return data;
        } else {
            if (typeof data.name === "string" && data.name.trim() === '') {
                throw console.log("Name cannot be empty");
            }
            if (typeof data.price === "number" && data.price === 0) {
                throw console.log("Price cant be 0");
            }
            if (typeof data.type === "string" && data.price === 0) {
                throw console.log("type must be provided");
            }

            return [data];
        }
        } else {
            throw console.log("No data provided");   
        }
    } catch (error) {
        throw console.log(error);
    }
}

export async function authenticate(req, res, next): Promise<void> {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing or invalid token" });
        } 
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}