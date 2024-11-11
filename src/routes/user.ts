import { Router } from "express";
import user from "../controllers/user";
import verifyToken from "../middleware/auth";
const router = Router();

router.route("/signin").post(user.signup);
router.route("/login").post(user.login);
router.get("/hello", verifyToken);

export default router;
