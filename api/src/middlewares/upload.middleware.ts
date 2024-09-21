import multer from "multer";
const MAX_FILE_SIZE = 6 * 1024 * 1024;

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_request, file, cb) => {
    if (file.mimetype !== "application/pdf" && file.mimetype !== "image/png") {
      return cb(
        new Error("Invalid file type. Only PDF and PNG files are allowed.")
      );
    }
    cb(null, true);
  },
});

export default upload;
