import prismaClient from "../../prisma";
import { IProductListByCategoryRequest } from "../../interfaces/product/IProductListByCategoryRequest";

class ListByCategoryService {
    async execute({ category_id }: IProductListByCategoryRequest) {

        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
            }
        })

        return findByCategory
    }
}

export { ListByCategoryService }