import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Preflight (OPTIONS) requests
app.options("*", cors());

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).send("🌍 JiraniEats API is running successfully...");
});

// ✅ Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Dynamic server startup (avoids port conflicts)
const PORT = process.env.PORT || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:", err);
      process.exit(1);
    }
  });
};

startServer(PORT);
