import { Router } from "express";
import { getProducts, getDetailProduct } from "../controllers/product.js";

const productRouter = Router();

productRouter.get('/product', getProducts);

productRouter.get('/products/:productId', getDetailProduct);


export default productRouter;