import prismaClient from "../../prisma";
import { ICategoryRequest } from "../../interfaces/category/ICategoryRequest";

class CreateCategoryService {
    async execute({ name }: ICategoryRequest) {
        
        if (name === "") throw new Error("Name invalid")

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })
        
        return category
    }
}

export { CreateCategoryService }