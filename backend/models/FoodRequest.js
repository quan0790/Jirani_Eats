import mongoose from "mongoose";

const foodRequestSchema = new mongoose.Schema(
  {
    foodType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const FoodRequest = mongoose.model("FoodRequest", foodRequestSchema);

export default FoodRequest;
