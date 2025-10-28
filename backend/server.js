import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.options("*", cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("JiraniEat API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${PORT} in use, trying ${PORT + 1}...`);
      app.listen(PORT + 1, () => console.log(`🚀 Server running on port ${PORT + 1}`));
    } else {
      console.error(err);
    }
  });
