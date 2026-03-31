import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import Project from "../../models/Project";
import { withAuth } from "../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    const projects = await Project.find().sort({ year: -1 });
    res.json(projects);
  })
  .post(
    withAuth(async (req, res) => {
      const project = await Project.create(req.body);
      res.status(201).json(project);
    })
  )
  .put(
    withAuth(async (req, res) => {
      const { id } = req.query;
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true
      });
      if (!project) return res.status(404).json({ message: "Not found" });
      res.json(project);
    })
  )
  .delete(
    withAuth(async (req, res) => {
      const { id } = req.query;
      await Project.findByIdAndDelete(id);
      res.json({ message: "Deleted" });
    })
  );

export default handler;