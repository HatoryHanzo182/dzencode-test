import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = Router();

router.get("/", OrderController.GetOrders);
router.get("/:id", OrderController.GetOrder);
router.get("/:id/summary", OrderController.GetOrderSummary);
router.get("/:id/products", OrderController.GetOrderProducts);

export default router;