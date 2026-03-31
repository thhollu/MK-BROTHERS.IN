import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import Service from "../../models/Service";
import { withAuth } from "../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    const services = await Service.find().sort({ category: 1 });
    res.json(services);
  })
  .post(
    withAuth(async (req, res) => {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    })
  )
  .put(
    withAuth(async (req, res) => {
      const { id } = req.query;
      const service = await Service.findByIdAndUpdate(id, req.body, {
        new: true
      });
      if (!service) return res.status(404).json({ message: "Not found" });
      res.json(service);
    })
  )
  .delete(
    withAuth(async (req, res) => {
      const { id } = req.query;
      await Service.findByIdAndDelete(id);
      res.json({ message: "Deleted" });
    })
  );

export default handler;