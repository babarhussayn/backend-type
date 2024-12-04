import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";
import { Response, Request } from "express";
const category = {
  create: async (req: Request, res: Response): Promise<void> => {
    const { name, products, imageurl, description } = req.body;

    let validProductIds: string[] = [];
    try {
      if (
        products &&
        typeof products === "string" &&
        products !== "undefined"
      ) {
        validProductIds = JSON.parse(products).map(
          (product: string) => product
        );
      }

      const exitCategory = await Category.findOne({ name });
      if (exitCategory) {
        res
          .status(409)
          .json({ message: "Category already exists", status: true });
        return;
      }

      const category = await Category.create({
        name,
        description,
        imageurl,
        products: validProductIds,
      });

      await Product.updateMany(
        { _id: { $in: validProductIds } },
        {
          $set: {
            category: new mongoose.Types.ObjectId(category._id.toString()),
          },
        }
      );

      if (category) {
        res.status(200).json({ message: "Category created", data: category });
      }
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        res.status(500).json({ status: false, message: err.message });
      } else {
        res
          .status(500)
          .json({ status: false, message: "An unknown error occurred" });
      }
    }
  },

  deleteCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const delCategory = await Category.findByIdAndDelete(req.params.id);
      if (delCategory) {
        res
          .status(200)
          .json({ status: true, message: "Category deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Error" });
    }
  },

  getCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      let category = [];
      category = await Category.find().populate({
        path: "products",
        select: "id name imageurl price description",
      });
      if (category) {
        res.status(200).json({ status: true, data: category });
      } else {
        res.status(404).json({ status: false, message: "Category not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id, ...updateData } = req.body;

      if (!_id) {
        res.status(400).json({ message: "Category ID is required" });
        return;
      }

      const category = await Category.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      if (category) {
        res
          .status(200)
          .json({ message: "Category updated successfully", category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the category",
        error,
      });
    }
  },
};
export default category;
