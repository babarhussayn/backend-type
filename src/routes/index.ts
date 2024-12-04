import { Application } from "express";
import user from "./user";
import category from "./category";
import product from "./product";
import order from "./order";
import contact from "./contact";
export default function (app: Application): void {
  app.use("/api/user", user);
  app.use("/api/category", category);
  app.use("/api/product", product);
  app.use("/api/order", order);
  app.use("/api/contact", contact);
}
