import Product from "../models/product";
import { Request, Response } from "express";
import { uploadFile } from "../utils/cloudinary";
const product = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      let data = req.body;

      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const imagePaths: string[] = [];

        for (const file of req.files) {
          // Upload each file and collect the uploaded image paths
          const uploadedImagePath = await uploadFile(file);
          imagePaths.push(uploadedImagePath);
        }

        // Add the uploaded image paths to the data object
        data.images = imagePaths;
      }

      // Create the new product with the provided data
      const newProduct = await Product.create(data);

      if (newProduct) {
        res.status(201).json({
          success: true,
          message: "Product created successfully",
          product: newProduct,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to create product",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred" });
      }
    }
  },
};

export default product;
