import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  term: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now }
});

searchSchema.index({ userId: 1, timestamp: -1 });
searchSchema.index({ term: 1 });

export default mongoose.model("Search", searchSchema);
