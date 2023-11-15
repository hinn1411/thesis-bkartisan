import mongoose, { Schema } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  quantity: string;
  isOnSale: boolean;
}

const productSchema = new Schema<IProduct>({
  name: String,
  price: Number,
  description: String,
  quantity: String,
  isOnSale: Boolean,
});

export default mongoose.model<IProduct>("Product", productSchema);
