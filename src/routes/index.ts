import { Application } from "express";
import user from "./user";
import category from "./category";

export default function (app: Application): void {
  app.use("/api/user", user);
  app.use("/api/category", category);
}
