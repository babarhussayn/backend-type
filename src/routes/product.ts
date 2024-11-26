import product from "../controllers/product";
import { Router } from "express";
import { upload } from "../utils/multer";

const router = Router();
router.route("/all-product").get(product.all);
router.route("/find-product").get(product.FindByid);
router.route("/create-product").post(upload.any(), product.create);
router.route("/delete-product/:id").delete(product.delete);

router.route("/update-product/:id").put(upload.any(), product.update);

export default router;
