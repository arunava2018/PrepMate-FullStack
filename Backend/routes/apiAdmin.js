import express from "express";
import { isAdmin } from "../controllers/adminController.js";
import { authMiddleware as requireAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/isAdmin", requireAuth, isAdmin);
export default router;
