import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import User from "../models/user";
config();

const myKey = process.env.SECRET_KEY as string;
console.log(myKey);
// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, myKey) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ status: false, message: "user not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
