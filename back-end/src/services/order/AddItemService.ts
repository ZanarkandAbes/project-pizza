import prismaClient from "../../prisma";
import { IItemRequest } from "../../interfaces/order/IItemRequest";

class AddItemService {
    async execute({ order_id, product_id, amount }: IItemRequest){

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
            }
        })

        return order
    }
}

export { AddItemService }