const multer = require("multer");

const MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type"), false);
  }
};

module.exports = multer({ storage, fileFilter }).single("image");
