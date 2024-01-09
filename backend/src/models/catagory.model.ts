import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/sqlconnect.js";

export interface Catagory {
    catagoryID: number,
    name: string,
    catagoryparent: number,
    level: number,
}

class CatagorySchema {

    static async getParentCatagory(id: number) {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                `WITH RECURSIVE CategoryHierarchy AS (
                    SELECT categoryID, name, catagoryparent
                    FROM Category
                    WHERE categoryID = ?
                  UNION
                    SELECT c.categoryID, c.name, c.catagoryparent
                    FROM Category c
                    JOIN CategoryHierarchy ch ON c.categoryID = ch.catagoryparent
                )
                SELECT * FROM CategoryHierarchy;`,
                [id]
            );
            return rows;
        } catch (error) {
            console.error("Error fetching parent categories:", error);
            throw error;
        }
    }

    static async getCatagoryLevel3() {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                `SELECT name FROM Catagory WHERE level = 3`
            );
            return rows;
        } catch (error) {
            console.error("Error fetching level 3 categories:", error);
            throw error;
        }
    }

    static async getCatagory(id: number) {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                `SELECT name FROM Catagory WHERE catagoryID = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error("Error fetching category by ID:", error);
            throw error;
        }
    }
}

export default CatagorySchema;