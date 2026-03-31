import nc from "next-connect";
import multer from "multer";
import path from "path";
import { withAuth } from "../../../middleware/auth";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public", "uploads"),
    filename: (req, file, cb) => {
      const uniq = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniq}${path.extname(file.originalname)}`);
    }
  })
});

const handler = nc()
  .use(withAuth) // only admin
  .use(upload.single("file"))
  .post((req, res) => {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
  });

export const config = { api: { bodyParser: false } };

export default handler;