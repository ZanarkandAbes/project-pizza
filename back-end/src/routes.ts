import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderControler } from "./controllers/order/RemoveOrderControler";
import { AddItemController } from "./controllers/order/AddItemController";

import { Authentication } from "./middlewares/user/Authentication";

import uploadConfig from "./config/multer"

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// --ROTAS USER --
router.post("/users", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/user-info", Authentication, new DetailUserController().handle)

// --ROTAS CATEGORY --
router.post("/category", Authentication, new CreateCategoryController().handle)

router.get("/categories", Authentication, new ListCategoryController().handle)

// --ROTAS PRODUCT --
router.post("/product", Authentication, upload.single("file"), new CreateProductController().handle)

router.get("/product/category", Authentication, new ListByCategoryController().handle)

// --ROTAS ORDER --
router.post("/order", Authentication, new CreateOrderController().handle)

router.delete("/order", Authentication, new RemoveOrderControler().handle)

router.post("/order/add", Authentication, new AddItemController().handle)

export { router };