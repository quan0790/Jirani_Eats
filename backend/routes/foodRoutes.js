import express from "express";
import { createFoodItem, getFoodItems, getFoodById } from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Create new food item (protected)
router.post("/", protect, createFoodItem);

// GET - Get all available foods
router.get("/", getFoodItems);

// GET - Get single food by ID
router.get("/:id", getFoodById);

export default router;
