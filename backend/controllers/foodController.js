import FoodItem from "../models/FoodItem.js";

// ✅ Create a new food item
export const createFoodItem = async (req, res) => {
  const { title, description, quantity, unit, pickupLocation } = req.body;

  try {
    if (!req.user) {
      console.error("❌ No user found in request");
      return res.status(401).json({ message: "Not authorized" });
    }

    const item = await FoodItem.create({
      title,
      description,
      quantity,
      unit,
      pickupLocation,
      postedBy: req.user._id,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("❌ Error creating food item:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all available food items
export const getFoodItems = async (req, res) => {
  const search = req.query.search || "";
  const query = { isAvailable: true, title: { $regex: search, $options: "i" } };

  try {
    const items = await FoodItem.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!item) return res.status(404).json({ message: "Food item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a food item
export const updateFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Food item not found" });

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this item" });
    }

    Object.assign(item, req.body);
    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a food item
export const deleteFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Food item not found" });

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
