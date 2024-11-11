import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();

const myKey = process.env.SECRET_KEY as string;

// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, myKey) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
