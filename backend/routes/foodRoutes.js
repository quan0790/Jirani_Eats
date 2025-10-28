import express from "express";
import {
  createFoodItem,
  getFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
} from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getFoodItems);
router.get("/:id", getFoodItemById);

// Protected routes
router.post("/", protect, createFoodItem);
router.put("/:id", protect, updateFoodItem);
router.delete("/:id", protect, deleteFoodItem);

export default router;
