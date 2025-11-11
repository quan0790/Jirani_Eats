import express from "express";
import {
  createFoodRequest,
  getFoodRequests,
  getRequestsForDonor,
  getSingleRequest,
  deleteFoodRequest,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Receiver: create a request
router.post("/", createFoodRequest);

// Receiver: get own requests
router.get("/", getFoodRequests);

// Donor: get all requests for their donations
router.get("/donor", getRequestsForDonor);

// Get single request by ID
router.get("/:id", getSingleRequest);

// Delete a request
router.delete("/:id", deleteFoodRequest);

export default router;
