import { model } from "mongoose";
import { Model, Mongoose, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
export default Category;
