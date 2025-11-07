import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "pcs",
    },
    pickupLocation: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    expiryDate: Date,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Register as "Food" (not "FoodItem") but still use "foods" collection
export default mongoose.model("Food", foodSchema, "foods");
