import express from "express";
import { Request, Response } from "express";
import setup_router from "./routes/setup.route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use("/", setup_router);

const PORT = process.env.PORT || 8000;

app.post("/git-webhook", (req: Request, res: Response) => {
  const data = req.body;
  console.log("data \n", req.body);
  res.send("Data Received..");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
