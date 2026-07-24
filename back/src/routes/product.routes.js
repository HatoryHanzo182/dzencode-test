import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const router = Router();

router.get("/", ProductController.GetProducts);
router.get("/filters", ProductController.GetProductFilters);

export default router;