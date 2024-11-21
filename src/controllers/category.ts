import Category from "../models/category";
import { Response, Request } from "express";
const category = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await Category.create({ ...req.body });
      if (category) {
        res.status(200).json({ message: "category create ", data: category });
      }
    } catch (error) {
      console.log(error);

      res.json({ status: false, message: "message" as string });
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
};
export default category;
