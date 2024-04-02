const multer = require("multer");
const XLSX = require("xlsx");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("csvFile");
// In single file key should be here like csvFile

const uploadCsv = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }
    console.log(req.file);
    return res.status(200).send("File uploaded successfully");
  });
};

module.exports = uploadCsv;
