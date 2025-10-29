// server.js

// 1. Load .env FIRST
import { config } from "dotenv";
config();

// 2. NOW import everything else
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import passport, { initializePassport } from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

const app = express();

// 3. CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none"
  }
}));

app.use(express.json());

// 4. MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

// 6. Passport — NOW SAFE TO INITIALIZE
app.use(passport.initialize());
app.use(passport.session());
initializePassport(); // ← This is the key!

// 7. Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// 8. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
