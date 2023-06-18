import prismaClient from "../../prisma";
import { IFinishOrderRequest } from "../../interfaces/order/IFinishOrderRequest";

class FinishOrderService {
    async execute({ order_id }: IFinishOrderRequest){

        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            }
        })

        return order
    }
}

export { FinishOrderService }
