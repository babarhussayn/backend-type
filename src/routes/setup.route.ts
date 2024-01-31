import { Router, Request, Response } from "express";
import { setup } from "../services/setup.service";
import path from "path";

const setup_router = Router();

setup_router.post("/setup", async (req: Request, res: Response) => {
  const setup_data = req.body;

  const playbook_path = path.join(__dirname, "./../../ansible/setup.yml");

  const response = await setup(playbook_path, {
    become_password: "mskhan",
    build_dir_name: "dist",
    dest: "/iancon/logistics/admin/client",
    site_dir: `~/sites/config/${setup_data.site_domain}`,
    repo_url: setup_data.repo_url,
  });

  if (response.success) {
    
    console.log(response)
    res.status(201).send(response);
  }
});

export default setup_router;
