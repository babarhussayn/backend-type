import contact from "../controllers/contact";
import { Router } from "express";

const router = Router();

router.route("/send").post(contact.send);
router.route("/all-message").get(contact.getall);
router.route("/delete-message/:id").delete(contact.deleteOne);

export default router;
