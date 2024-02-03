import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const PORT = process.env.PORT || 8000;

app.post("/test-route", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
