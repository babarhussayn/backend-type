import { Application } from "express";
import user from "./user";

export default function (app: Application): void {
  app.use("/api/user", user);
}
