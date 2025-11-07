import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";




dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Preflight (OPTIONS) support
app.options("*", cors());

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("🌍 JiraniEat API is running...");
});

// ✅ Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 5000;

const startServer = (port) => {
  const server = app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}`)
  );

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
};

startServer(PORT);
