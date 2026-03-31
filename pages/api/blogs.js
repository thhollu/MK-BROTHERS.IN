import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import BlogPost from "../../models/BlogPost";
import { withAuth } from "../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  })
  .post(
    withAuth(async (req, res) => {
      const post = await BlogPost.create(req.body);
      res.status(201).json(post);
    })
  )
  .put(
    withAuth(async (req, res) => {
      const { id } = req.query;
      const post = await BlogPost.findByIdAndUpdate(id, req.body, {
        new: true
      });
      if (!post) return res.status(404).json({ message: "Not found" });
      res.json(post);
    })
  )
  .delete(
    withAuth(async (req, res) => {
      const { id } = req.query;
      await BlogPost.findByIdAndDelete(id);
      res.json({ message: "Deleted" });
    })
  );

export default handler;