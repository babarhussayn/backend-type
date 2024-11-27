import { Router } from "express";
import order from "../controllers/order";

const router = Router();

router.route("/new-order").post(order.create);

router.route("/all-order").get(order.allOrders);
router.route("/find-order/:id").get(order.orderById);

export default router;
