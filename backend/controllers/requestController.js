import FoodRequest from "../models/FoodRequest.js";

// ✅ Create new food request
export const createFoodRequest = async (req, res) => {
  try {
    const { foodType, message } = req.body;

    const request = await FoodRequest.create({
      foodType,
      message,
      requestedBy: req.user._id,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("❌ Error creating food request:", err);
    res.status(500).json({ message: "Server error while creating request" });
  }
};

// ✅ Get all requests (for admins or dashboard)
export const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

// ✅ Get single request
export const getSingleRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id).populate("requestedBy", "name email");
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error fetching request" });
  }
};

// ✅ Delete request
export const deleteFoodRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.requestedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this request" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request" });
  }
};
