import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
console.log(process.env.IDS_PORT);
const PORT = process.env.IDS_PORT || 8000;

app.get("/test-route", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
