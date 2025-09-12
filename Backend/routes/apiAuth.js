import express from "express";
import { signup, login, me, getUserById } from "../controllers/authController.js";
import {authMiddleware as requireAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.get("/user/:id", requireAuth, getUserById);
export default router;
