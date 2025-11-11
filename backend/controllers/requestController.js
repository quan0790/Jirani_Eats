import FoodRequest from "../models/FoodRequest.js";
import { io } from "../server.js";

// ✅ Create a new food request
export const createFoodRequest = async (req, res) => {
  try {
    const { foodId, pickupLocation, message, phoneNumber, pickupTime } = req.body;

    if (!foodId || !pickupLocation || !phoneNumber || !pickupTime) {
      return res.status(400).json({ message: "Food ID, pickup location, phone number, and pickup time are required" });
    }

    const request = await FoodRequest.create({
      foodId,
      pickupLocation,
      message: message || "",
      phoneNumber,
      pickupTime,
      requestedBy: req.user._id,
    });

    // Emit real-time update
    io.emit("requestAdded", { ...request.toObject(), requestedBy: req.user._id });

    res.status(201).json(request);
  } catch (error) {
    console.error("❌ Error creating food request:", error.message);
    res.status(500).json({ message: "Server error while creating food request" });
  }
};

// ✅ Get all requests made by the logged-in receiver
export const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find({ requestedBy: req.user._id })
      .populate("requestedBy", "name email phoneNumber")
      .populate("foodId", "title description quantity unit pickupLocation image");
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching food requests:", error.message);
    res.status(500).json({ message: "Server error while fetching food requests" });
  }
};

// ✅ Get all requests for foods posted by the donor
export const getRequestsForDonor = async (req, res) => {
  try {
    const allRequests = await FoodRequest.find()
      .populate("foodId", "title postedBy")
      .populate("requestedBy", "name email phoneNumber pickupTime");

    const myRequests = allRequests.filter(
      (r) => r.foodId.postedBy.toString() === req.user._id.toString()
    );

    res.json(myRequests);
  } catch (error) {
    console.error("❌ Error fetching requests for donor:", error.message);
    res.status(500).json({ message: "Server error while fetching requests for donor" });
  }
};

// ✅ Get a single request by ID
export const getSingleRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id)
      .populate("requestedBy", "name email phoneNumber")
      .populate("foodId", "title description quantity unit pickupLocation");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    console.error("❌ Error fetching single request:", error.message);
    res.status(500).json({ message: "Server error while fetching single request" });
  }
};

// ✅ Delete a food request
export const deleteFoodRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this request" });
    }

    await request.deleteOne();

    io.emit("requestCancelled", req.params.id);

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting request:", error.message);
    res.status(500).json({ message: "Server error while deleting food request" });
  }
};
