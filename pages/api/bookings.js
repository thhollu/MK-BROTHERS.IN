import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import Booking from "../../models/Booking";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    const booking = await Booking.create(req.body);
    console.log(`📅 New ${booking.bookingType} booking from ${booking.name}`);
    res.status(201).json({ message: "Booking received", booking });
  })
  .get(async (req, res) => {
    const list = await Booking.find().sort({ dateTime: -1 });
    res.json(list);
  });

export default handler;