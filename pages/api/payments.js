import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import Payment from "../../models/Payment";
import { withAuth } from "../../middleware/auth";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(
    withAuth(async (req, res) => {
      const { amount, currency = "INR", description } = req.body;
      const payment = await Payment.create({ amount, currency, description });
      const mockUrl = `https://payment-mock.example.com/pay?pid=${payment._id}`;
      res.json({ paymentUrl: mockUrl, paymentId: payment._id });
    })
  )
  .post(
    "/notify",
    async (req, res) => {
      const { paymentId, status } = req.body;
      await Payment.findByIdAndUpdate(paymentId, { status });
      res.json({ message: "Status updated" });
    }
  );

export default handler;