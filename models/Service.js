import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  imageUrl: { type: String },
  icon: { type: String }
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);