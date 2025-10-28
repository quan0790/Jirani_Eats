import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("🟢 Register attempt:", { name, email });

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password correctly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ User registered:", email);

    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("🔥 Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("🟡 Login attempt:", { email, password });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("🔴 No user found for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Ensure bcrypt.compare is awaited
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🟢 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful for:", email);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ GET USER PROFILE
export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
