import path from "path";
import express, { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/static/markdown"); // Aqui se guardaran los archivos subidos via este endpoint
  },
  filename: (req, file, calllback) => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    calllback(
      null,
      `${
        file.originalname.split(".")[0]
      }-${day}-${month}-${year}-${hours}-${minutes}-${seconds}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No se subió ningún archivo" });
  } else {
    res.json({
      message: "Archivo subido exitosamente",
      filename: req.file.filename,
      path: req.file.path,
    });
  }
});

export default router;
