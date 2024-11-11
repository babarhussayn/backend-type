import User from "../models/user";
import { Request, Response, NextFunction } from "express";

const user = {
  signup: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const newUser = await User.create({ ...req.body });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
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
      return;
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
      res.status(200).json({ message: "User login successfully", user });
    } catch (error) {
      console.log(error);
    }
    next();
  },
};
export default user;
