import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
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

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check endpoint
app.get("/healthz", (req, res) => res.status(200).json({ status: "OK" }));

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://jirani-eats-five.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options("*", cors());

// ✅ Root route
app.get("/", (req, res) => {
  res.status(200).send("🌍 JiraniEats API is running successfully...");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ✅ HTTP server for Socket.IO
const server = http.createServer(app);

// ✅ Socket.IO setup with CORS
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Start server with port fallback
const startServer = (port) => {
  server.listen(port, () => {
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
