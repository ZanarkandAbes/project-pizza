import prismaClient from "../../prisma";
import { IRemoveItemRequest } from "../../interfaces/order/IRemoveItemRequest";

class RemoveItemService {
    async execute({ item_id }: IRemoveItemRequest){

        const order = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        })

        return order
    }
}

export { RemoveItemService }