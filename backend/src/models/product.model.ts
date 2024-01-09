import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/sqlconnect.js";

export interface Product {
    id: number,
    name: string,
    price: number,
    desription?: string,
    quantity: number,
    isOnSale: boolean,
    seller: string,
    createAt: Date,
    approvedAt: Date,
    approver?: string,
    status: string,
    images: string[]
}

class ProductSchema {
    
    static async getProductImages(productID) {
        const [images] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ProductImage
            where imageID=?;`,
            [productID]
        );
        images.forEach((value, index, array) => {
            array[index] = value.link
        })
        return images;
    }

    static async getProducts() {
        const [products] = await pool.query<RowDataPacket[]>(`SELECT * FROM Product;`);
        for (let i = 0; i < products.length; i++) {
            const images = await ProductSchema.getProductImages(products[i].productID);
            products[i].images = images;
        }
        return products;
    }

    static async getProductDetail(id) {
        const product = (await pool.query<RowDataPacket[]>(
            `select * from Product where productID=?`, 
            [id]
        ))[0][0];
        product.images = await ProductSchema.getProductImages(product.productID)
        return product;
    }

    static async addProduct() {
        
    }
}

export default ProductSchema;
