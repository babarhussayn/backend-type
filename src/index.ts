import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import Db from "./connection/connect";
import routes from "./routes";
config();
const app = express();
Db;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5001"],
  })
);
routes(app);
console.log(process.env.PORT);
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
