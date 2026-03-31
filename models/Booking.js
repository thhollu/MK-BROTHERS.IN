import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookingType: { type: String, enum: ["Demo", "FactoryVisit"], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateTime: { type: Date, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);