import { Router, Request, Response } from "express";
import { setup } from "../services/setup.service";
import path from "path";

const setup_router = Router();

setup_router.post("/react-frontend", async (req: Request, res: Response) => {
  const setup_data = req.body;

  console.log(setup_data);
  const playbook_path = path.join(__dirname, "./../../ansible/setup.yml");
  try {
    const response = await setup(playbook_path, {
      become_password: "mskhan",
      build_dir_name: "dist",
      dest: "/clones/client",
      site_dir: `/sites/config/${setup_data.domain}`,
      repo_url: setup_data.git_url,
      domain: setup_data.site_domain,
    });

    if (response.success) {
      res.status(201).send(response);
    }
  } catch (err: unknown) {
    console.log("err: ", JSON.parse((err as any).payload as string));

    const payload = (err as any).payload;
    let error = payload.slice(
      payload.indexOf("stderr_lines"),
      payload.indexOf("stdout_lines")
    );
    error = error
      .replace(`stderr_lines": ["fatal: `, "")
      .replace(`."], "stdout":`, "")
      .replace(/[,"':]/g, "");

    res.status(500).send({
      success: false,
      payload,
      error,
    });
  }
});

export default setup_router;
