import prismaClient from "../../prisma";
import { IOrderRequest } from "../../interfaces/order/IOrderRequest";

class CreateOrderService {
    async execute({ table, name }: IOrderRequest){

        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name,
            }
        })

        return order
    }
}

export { CreateOrderService }