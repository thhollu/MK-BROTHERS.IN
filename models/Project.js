import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  resumeUrl: { type: String },
  year: { type: Number }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);