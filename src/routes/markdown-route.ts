import path, { extname } from "path";
import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { MarkdownService } from "../services/markdown-service";

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

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const allowedMimeTypes = ["text/markdown", "text/plain"];
  const allowedExtensions = [".md", ".markdown"];

  const fileExt = extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.includes(fileExt)
  ) {
    callback(null, true); // Archivo aceptado
  } else {
    callback(new Error("Only allow markdown files (.md o .markdown)")); // Archivo rechazado
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No se subió ningún archivo" });
  } else {
    res.json({
      message: "Archivo subido exitosamente",
      filename: req.file.filename,
    });
  }
});

router.get("/all-uploaded", async (req: Request, res: Response) => {
  const markdownService = new MarkdownService();
  const filesUploaded = await markdownService.getAllFilesUploaded();

  if (!filesUploaded) {
    res
      .status(200)
      .json({ data: null, message: "There aren't files uploaded" });
  } else {
    res
      .status(200)
      .json({ data: filesUploaded, message: "There are files uploaded" });
  }
});

router.get("/html-version", async (req: Request, res: Response) => {
  const { fileName }: { fileName: string } = req.body;
  if (!fileName) {
    res.status(400).json({ data: null, message: "Required body" });
  } else {
    const markdownService = new MarkdownService();
    const htmlContent = await markdownService.convertToHTML(fileName);

    if (!htmlContent) {
      res
        .status(400)
        .json({ data: null, message: `Dont exist file with name ${fileName}` });
    } else {
      res.status(200).send(htmlContent);
    }
  }
});

export default router;
