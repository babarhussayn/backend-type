import { Router } from "express";
import user from "../controllers/user";
import verifyToken from "../middleware/auth";
const router = Router();

router.route("/signup").post(user.signup);
router.route("/login").post(user.login);
router.route("/getall").get(verifyToken, user.getall);
router.route("/:_id").get(user.userbyid);

export default router;
