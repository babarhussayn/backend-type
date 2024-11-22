import { Router } from "express";
import category from "../controllers/category";

const router = Router();

router.route("/create-category").post(category.create);
router.route("/delete-category/:id").delete(category.deleteCategory);
router.route("/all-category").get(category.getCategory);
router.route("/update-category").put(category.updateCategory);

export default router;
