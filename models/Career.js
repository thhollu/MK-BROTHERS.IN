import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  applyEmail: { type: String, required: true },
  postedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Career || mongoose.model("Career", CareerSchema);