// controllers/foodController.js
import Food from "../models/FoodItem.js";
import { io } from "../server.js";

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
      postedBy: req.user._id,
    });

    io.emit("foodAdded", {
      ...newFood.toObject(),
      postedBy: req.user._id,
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error("❌ Error creating food item:", error);
    res.status(500).json({ message: "Server error creating food item" });
  }
};

// ✅ Get all food items (public for logged-in users)
export const getFoodItems = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    console.error("❌ Error fetching foods:", error);
    res.status(500).json({ message: "Server error fetching food items" });
  }
};

// ✅ Get single food item by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("postedBy", "name email");
    if (!food) return res.status(404).json({ message: "Food item not found" });

    res.json(food);
  } catch (error) {
    console.error("❌ Error fetching food by ID:", error);
    res.status(500).json({ message: "Server error fetching food item" });
  }
};

// ✅ Update food item
export const updateFoodItem = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    if (food.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this food item" });
    }

    const { title, description, quantity, unit, expiryDate, pickupLocation } = req.body;

    food.title = title || food.title;
    food.description = description || food.description;
    food.quantity = quantity || food.quantity;
    food.unit = unit || food.unit;
    food.expiryDate = expiryDate || food.expiryDate;
    food.pickupLocation = pickupLocation || food.pickupLocation;

    await food.save();

    io.emit("foodUpdated", food);

    res.json(food);
  } catch (error) {
    console.error("❌ Error updating food item:", error);
    res.status(500).json({ message: "Server error updating food item" });
  }
};

// ✅ Delete food item
export const deleteFoodItem = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    if (food.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this food item" });
    }

    await food.deleteOne();

    io.emit("foodDeleted", req.params.id);

    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting food item:", error);
    res.status(500).json({ message: "Server error deleting food item" });
  }
};
