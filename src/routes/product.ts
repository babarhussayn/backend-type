import product from "../controllers/product";
import { Router } from "express";

const router = Router();

router.route("/create-product").post(product.create);

export default router;
