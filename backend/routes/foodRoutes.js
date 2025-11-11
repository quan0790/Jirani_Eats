import express from "express";
import {
  createFoodItem,
  getFoodItems,
  getFoodById,
  updateFoodItem,
  deleteFoodItem,
} from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createFoodItem);
router.get("/", getFoodItems); // all logged-in users can see donations
router.get("/:id", getFoodById);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);

export default router;
