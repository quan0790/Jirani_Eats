// controllers/foodController.js
import Food from "../models/FoodItem.js";

// ✅ Create new food item
export const createFoodItem = async (req, res) => {
  try {
    const { title, description, quantity, unit, expiryDate, pickupLocation } = req.body;

    if (!title || !quantity) {
      return res.status(400).json({ message: "Title and quantity are required" });
    }

    const newFood = await Food.create({
      title,
      description,
      quantity,
      unit,
      expiryDate,
      pickupLocation,
      postedBy: req.user._id, // from auth middleware
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error("❌ Error creating food item:", error);
    res.status(500).json({ message: "Server error creating food item" });
  }
};

// ✅ Get all available foods
export const getFoodItems = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 }); // latest first

    res.json(foods);
  } catch (error) {
    console.error("❌ Error fetching foods:", error);
    res.status(500).json({ message: "Server error fetching food items" });
  }
};

// ✅ Get a single food item by ID (for RequestFood page)
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("postedBy", "name email");
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(food);
  } catch (error) {
    console.error("❌ Error fetching food by ID:", error);
    res.status(500).json({ message: "Server error fetching food item" });
  }
};
