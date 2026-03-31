import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["Dealer", "Customer", "Solar", "Support", "Investor"],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);