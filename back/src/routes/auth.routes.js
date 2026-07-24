import express from "express";
import { GetGuestToken } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/token", GetGuestToken);

export default router;