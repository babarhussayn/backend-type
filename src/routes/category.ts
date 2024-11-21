import { Router } from "express";
import category from "../controllers/category";

const router = Router();

router.route("/create-category").post(category.create);
router.route("/delete-category/:id").delete(category.deleteCategory);

export default router;
