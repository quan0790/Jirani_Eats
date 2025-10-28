import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import FoodItem from "../models/FoodItem.js";
import bcrypt from "bcryptjs";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@jirani.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@jirani.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    name: "Jane Smith",
    email: "jane@jirani.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

const foodItems = [
  {
    title: "Extra Chapati",
    description: "Freshly made chapati available for pickup",
    quantity: 10,
    unit: "pieces",
    pickupLocation: { address: "Nairobi CBD" },
  },
  {
    title: "Leftover Rice",
    description: "Rice from lunch, still fresh and clean",
    quantity: 3,
    unit: "plates",
    pickupLocation: { address: "Kibera" },
  },
];

const importData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await FoodItem.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleFoods = foodItems.map((item) => ({
      ...item,
      postedBy: adminUser,
    }));

    await FoodItem.insertMany(sampleFoods);

    console.log("✅ Sample data imported!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await FoodItem.deleteMany();
    console.log("🗑️ Data destroyed!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
