import Category from "../models/category";
import { Response, Request } from "express";
const category = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const exitCategory = await Category.findOne({ name: req.body.name });
      if (exitCategory) {
        res
          .status(409)
          .json({ message: "category alresy exits", status: true });
      }

      const category = await Category.create({ ...req.body });
      if (category) {
        res.status(200).json({ message: "category create ", data: category });
      }
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        res.json({ status: false, message: err.message });
      } else {
        res.json({ status: false, message: "An unknown error occurred" });
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
      const category = await Category.find({});
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
      res
        .status(500)
        .json({
          message: "An error occurred while updating the category",
          error,
        });
    }
  },
};
export default category;
