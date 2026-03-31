import nc from "next-connect";
import { dbConnect } from "../../../lib/mongodb";
import Career from "../../../models/Career";
import { withAuth } from "../../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    const jobs = await Career.find().sort({ postedAt: -1 });
    res.json(jobs);
  })
  .post(
    withAuth(async (req, res) => {
      const job = await Career.create(req.body);
      res.status(201).json(job);
    })
  )
  .put(
    withAuth(async (req, res) => {
      const { id } = req.query;
      const job = await Career.findByIdAndUpdate(id, req.body, {
        new: true
      });
      if (!job) return res.status(404).json({ message: "Not found" });
      res.json(job);
    })
  )
  .delete(
    withAuth(async (req, res) => {
      const { id } = req.query;
      await Career.findByIdAndDelete(id);
      res.json({ message: "Deleted" });
    })
  );

export default handler;