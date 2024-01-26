import { Router, Request, Response } from "express";
import { setup } from "../services/setup.service";
const setup_router = Router();

setup_router.post("/setup", async (req: Request, res: Response) => {
  const setup_data = req.body;
  await setup(setup_data.playbook, setup_data.options);
});
