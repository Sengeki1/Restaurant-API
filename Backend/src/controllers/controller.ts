import { Order } from "../model/model.dto";

export async function middleware(data: [Order]): Promise<Order[]> {
    try {
        if (data) {
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
            throw console.log("No data provided");   
        }
    } catch (error) {
        throw console.log(error);
    }
}