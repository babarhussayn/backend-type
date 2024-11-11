import { Router } from "express";
import user from "../controllers/user";

const router = Router();

router.route("/signin").post(user.signup);
router.route("/login").post(user.login);

export default router;
