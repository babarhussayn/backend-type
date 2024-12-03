import mongoose, { Document, model, Mongoose, Schema, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: string;
  imageurl: string;
  category: mongoose.Schema.Types.ObjectId;
  title: string;
  size: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: String,
      min: 0,
      required: true,
    },
    imageurl: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    size: {
      type: String, // Array of strings
      enum: ["small", "medium", "large", "extraLarge"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);
const Product = model("Product", productSchema);

export default Product;
