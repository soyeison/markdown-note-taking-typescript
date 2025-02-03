"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "static/markdown"); // Aqui se guardaran los archivos subidos via este endpoint
    },
    filename: (req, file, calllback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        calllback(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No se subió ningún archivo" });
    }
    else {
        res.json({
            message: "Archivo subido exitosamente",
            filename: req.file.filename,
            path: req.file.path,
        });
    }
});
exports.default = router;
