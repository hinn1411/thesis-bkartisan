import { Router } from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";

const routers = Router();
routers.use(authRouter);
routers.use(productRouter);

export default routers;