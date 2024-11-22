import Product from "../models/product";
import { Request, Response } from "express";

const product = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.create({ ...req.body });
      if (product) {
        res.status(200).json({
          status: true,
          data: product,
          message: "Product created successfully",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: true, message: error.message });
      } else {
        res.json({ status: false, message: "An unknown error occurred" });
      }
    }
  },
};

export default product;
