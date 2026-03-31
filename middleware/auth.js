import nc from "next-connect";
import { verifyToken } from "../lib/auth";

export function withAuth(handler) {
  return nc()
    .use(async (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "No token" });

      const token = authHeader.split(" ")[1];
      const payload = verifyToken(token);
      if (!payload) return res.status(401).json({ message: "Invalid token" });

      req.user = payload; // { id, email }
      next();
    })
    .use(handler);
}