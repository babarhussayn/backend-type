import product from "../controllers/product";
import { Router } from "express";
import { upload } from "../utils/multer";

const router = Router();

router.route("/create-product").post(upload.any(), product.create);

export default router;
