import { Request, Response } from "express";
import CatagorySchema from "../models/catagory.model.js";

export const getCatagoryLevel3 = async (req: Request, res: Response) => {
    try {
        const catagoryLevel3 = await CatagorySchema.getCatagoryLevel3()
        res.status(200).send(catagoryLevel3);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

