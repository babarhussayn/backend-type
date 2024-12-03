import Product from "../models/product";
import { Request, Response } from "express";
import { uploadFile } from "../utils/cloudinary";
import mongoose from "mongoose";
import Category from "../models/category";
const product = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = req.body;

      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const imagePaths: string[] = [];

        for (const file of req.files) {
          // Upload each file and collect the uploaded image paths
          const uploadedImagePath = await uploadFile(file);
          imagePaths.push(uploadedImagePath);
        }

        // Add the uploaded image paths to the data object
        product.images = imagePaths;
      }
      console.log(product);
      // Create the new product with the provided data
      const newProduct = await Product.create(product);
      await Category.findByIdAndUpdate(product.category, {
        $push: { products: newProduct._id },
      });

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
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id, ...updateData } = req.body;

      if (!_id) {
        res.status(400).json({ message: "product ID is required" });
        return;
      }

      const category = await Product.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      if (category) {
        res
          .status(200)
          .json({ message: "product updated successfully", category });
      } else {
        res.status(404).json({ message: "product not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        res.status(500).json({ status: true, message: "erroor" });
      }
    }
  },

  all: async (req: Request, res: Response): Promise<void> => {
    try {
      const allData = await Product.find().populate("category");

      if (!allData) {
        res.status(404).json({ status: true, message: "Product not found" });
      }

      res.status(200).json({ status: true, data: allData });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: true, message: "erroor" });
      }
    }
  },
  FindByid: async (req: Request, res: Response): Promise<void> => {
    try {
      const findData = await Product.findById(req.body._id);

      if (!findData) {
        res.status(404).json({ status: true, message: "id not found" });
      }

      res.status(200).json({ status: true, data: findData });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: true, message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findByIdAndDelete(req.body._id);
      if (!product) {
        res.status(404).json({ status: true, message: "Product not found" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "product deleted successfully" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: true, message: error.message });
      }
    }
  },
};

export default product;
