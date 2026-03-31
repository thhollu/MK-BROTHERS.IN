import nc from "next-connect";
import { dbConnect } from "../../lib/mongodb";
import Contact from "../../models/Contact";

async function mockSendEmail({ to, subject, text }) {
  console.log("📧 EMAIL →", { to, subject, text });
}

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    const { name, email, phone, message, type } = req.body;
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      type
    });

    await mockSendEmail({
      to: "mkbcommercials@gmail.com",
      subject: `New ${type} Inquiry`,
      text: `From: ${name} <${email}>\\nPhone: ${phone}\\nMessage:\\n${message}`
    });

    res.status(201).json({ message: "Submitted successfully" });
  });

export default handler;