import { Request, Response } from "express";
import ProductSchema from "../models/product.model.js";

export const getProduct = (req: Request, res: Response) => {
    res.status(200).send({msg: "Inside getProduct controller"});
}