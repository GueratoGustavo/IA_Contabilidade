import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const ALLOWED_MIMETYPES = ["text/csv", "application/pdf"];
const MAX_FILE_SIZE = 750 * 1024 * 1024;

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não suportado"));
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export default upload;
