import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/sqlconnect.js";

export interface ProductCatagory {
    catagory: number,
    product: number,
}

class ProductCatagorySchema {
    static async findOne(product: number) {
        const [rows] = await pool.query<RowDataPacket[]>(
          `select catagory from ProductCatagory where product=?`, 
          [product]
        );
        return rows[0];
      }
    static async create(catagory:number, product: number) {
        try {
            const [result] = await pool.query<ResultSetHeader>(
                `INSERT INTO ProductCatagory (catagory, product) VALUES (?, ?)`,
                [catagory, product]
            );
            
            return result.insertId;
        } catch (error) {
            console.error("Error during insertion:", error);
            throw error;
        }
      }
}

export default ProductCatagorySchema;