import prismaClient from "../../prisma";
import { IRemoveOrderRequest } from "../../interfaces/order/IRemoveOrderRequest";

class RemoveOrderService {
    async execute({ order_id }: IRemoveOrderRequest) {

        const order = await prismaClient.order.delete({
            where: {
                id: order_id,
            }
        })

        return order
    }
}

export { RemoveOrderService }
