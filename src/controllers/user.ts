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
};
export default user;
