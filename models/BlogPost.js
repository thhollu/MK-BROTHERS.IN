import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // HTML
  imageUrl: { type: String },
  author: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);