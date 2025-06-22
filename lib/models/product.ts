import { models, Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subCategory: string;
  stock: number;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  stock: { type: Number, required: true },
}, {
  timestamps: true,
});

const Product = models.product || model<IProduct>("product", productSchema);

export default Product;
