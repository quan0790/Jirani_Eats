import FoodRequest from "../models/FoodRequest.js";

// ✅ Create a new food request
export const createFoodRequest = async (req, res) => {
  try {
    const { foodId, pickupLocation, message } = req.body;

    // Validate required fields
    if (!foodId || !pickupLocation) {
      return res
        .status(400)
        .json({ message: "Food ID and pickup location are required" });
    }

    // Create a new request
    const request = await FoodRequest.create({
      foodId,
      pickupLocation,
      message,
      requestedBy: req.user._id, // from protect middleware
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("❌ Error creating food request:", error.message);
    res
      .status(500)
      .json({ message: "Server error while creating food request" });
  }
};

// ✅ Get all requests made by the logged-in user
export const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find({ requestedBy: req.user._id })
      .populate("requestedBy", "name email")
      .populate("foodId", "title description expiryDate");

    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching food requests:", error.message);
    res
      .status(500)
      .json({ message: "Server error while fetching food requests" });
  }
};

// ✅ Get a single request by ID
export const getSingleRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id)
      .populate("requestedBy", "name email")
      .populate("foodId", "title description expiryDate");

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    console.error("❌ Error fetching single request:", error.message);
    res
      .status(500)
      .json({ message: "Server error while fetching single request" });
  }
};

// ✅ Delete a food request
export const deleteFoodRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    // Ensure only the user who created the request can delete it
    if (request.requestedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this request" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting request:", error.message);
    res
      .status(500)
      .json({ message: "Server error while deleting food request" });
  }
};
