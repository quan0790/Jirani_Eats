import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createFoodRequest,
  getFoodRequests,
  getSingleRequest,
  deleteFoodRequest,
} from "../controllers/requestController.js";

const router = express.Router();

// 🔒 Protected: Only logged-in users can make or view requests
router.post("/", protect, createFoodRequest);
router.get("/", protect, getFoodRequests);
router.get("/:id", protect, getSingleRequest);
router.delete("/:id", protect, deleteFoodRequest);

export default router;
