import { Router } from "express";
import user from "../controllers/user";

const router = Router();

router.route("/signin").post(user.signup);

export default router;
