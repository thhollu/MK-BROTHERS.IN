import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  paymentId: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);