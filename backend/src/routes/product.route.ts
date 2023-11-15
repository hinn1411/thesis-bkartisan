import { Router } from "express";
import { getProduct } from "../controllers/product.js";

const productRouter = Router();

productRouter.get('/product', getProduct);

export default productRouter;