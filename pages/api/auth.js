import { dbConnect } from "../../../lib/mongodb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // First run: ensure admin exists (email from env if you wish)
  res.json({ token, user: { email: user.email } });
}