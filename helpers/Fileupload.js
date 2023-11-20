const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Always accept the file, regardless of type
  cb(null, true);
};

const Fileuploads = multer({ storage, fileFilter });

module.exports = Fileuploads;
