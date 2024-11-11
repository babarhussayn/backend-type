import mongoose from "mongoose";
import { config } from "dotenv";

config();
const Db = process.env.DATA_BASE as string;

mongoose
  .connect(Db, {})

  .then(() => {
    console.log("data base connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
export default Db;
