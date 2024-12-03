import mongoose, { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    imageurl: { type: String, required: [true, "image is required"] },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
export default Category;
