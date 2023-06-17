import prismaClient from "../../prisma";
import { ISendOrderRequest } from "../../interfaces/order/ISendOrderRequest";

class SendOrderService {
    async execute({ order_id }: ISendOrderRequest) {

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: false,
            }
        })

        return order
    }
}

export { SendOrderService }
