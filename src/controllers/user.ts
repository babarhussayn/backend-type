import bcrypt from "bcrypt";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import path from "path";
import { Error as MongooseError } from "mongoose";
config({
  path: path.join(__dirname, "../../.env"),
});

const user = {
  signup: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body);
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const newUser = await User.create({ ...req.body });
      console.log(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        const errors = Object.values(error.errors).map((err) => err.message);
        res.status(400).json({ message: "Validation failed", errors });
        return;
      }

      next(error);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        status: false,
        message: "Please provide email and password!",
      });
    }

    try {
      // 2) Check if user exists && password is correct
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.json({
          status: false,
          message: "Incorrect email or password",
        });
        return;
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.json({
          status: false,
          message: "Incorrect email or password",
        });
        return;
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: " login successfully", user, token });
      // } catch (error) {
      // res.status(500).json({ error: 'Login failed' });
      // };
    } catch (error) {
      console.log(error);
    }
    next();
  },

  getall: async (req: Request, res: Response) => {
    try {
      const findUser = await User.find({});
      res.status(200).json({ message: "user get successfully", findUser });
      return;
    } catch (error) {
      res.status(500).json({ error: "User not found" });
    }
  },

  userbyid: async (req: Request, res: Response) => {
    try {
      const searchUser = await User.findById(req.body._id);

      if (!searchUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User found", searchUser });
    } catch (error) {
      console.error("Error fetching user:", error); // Log the actual error
      res.status(500).json({ message: "Server error. Unable to fetch user" });
    }
  },
};
export default user;
