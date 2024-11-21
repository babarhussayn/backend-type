import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import Db from "./connection/connect";
import routes from "./routes";
import bodyParser from "body-parser";
config();
const app = express();
Db;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
routes(app);
app.use(bodyParser.json());
// console.log(process.env.PORT);
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
