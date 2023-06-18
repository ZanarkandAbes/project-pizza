import prismaClient from "../../prisma";
import { IDetailRequest } from "../../interfaces/order/IDetailRequest";

class DetailOrderService {
    async execute({ order_id }: IDetailRequest){

        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true,
            }
        })

        return orders
    }
}

export { DetailOrderService }



