import { Request, Response } from "express";
import ProductSchema from "../models/product.model.js";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductSchema.getProducts();
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

export const getDetailProduct = async (req: Request, res: Response) => {
    try {
        const {productId} = req.body?.productId;
        const detailProduct = await ProductSchema.getProductDetail(productId);
        const productImages = await ProductSchema.getProductImages(productId);
        res.status(200).send({ detailProduct, productImages });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}