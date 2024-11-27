import { Router } from "express";
import order from "../controllers/order";

const router = Router();

router.route("/new-order").post(order.create);

router.route("/all-order").get(order.allOrders);
router.route("/find-order/:id").get(order.orderById);
router.route("/delete-order/:id").delete(order.deleteOrder);
router.route("/update-order/:id").put(order.updateOrder);

export default router;
