import nc from "next-connect";
import { dbConnect } from "../../../lib/mongodb";
import Newsletter from "../../../models/Newsletter";
import { withAuth } from "../../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    try {
      const sub = await Newsletter.create({ email });
      res.status(201).json({ message: "Subscribed" });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: "Already subscribed or invalid email" });
    }
  })
  .get(
    withAuth(async (req, res) => {
      const list = await Newsletter.find().sort({ subscribedAt: -1 });
      res.json(list);
    })
  );

export default handler;