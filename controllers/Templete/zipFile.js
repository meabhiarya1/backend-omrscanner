const multer = require("multer");
const XLSX = require("xlsx");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = ["zip", "zipx", "jar", "apk", "ipa", "cbz", "7z"];
    console.log(ext);

    // Determine the destination folder based on file type
    const destinationFolder = ext.includes(file.originalname.split(".").pop())
      ? "zipFile/"
      : "csvFile/";
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now() / 1000;
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

// Accept both "csvFile" and "zipFile" fields
const upload = multer({ storage: storage }).fields([
  { name: "csvFile" },
  { name: "zipFile" },
]);

const uploadPromise = (req, res, next) => {
  return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
      console.log(req.files);
      resolve("File Uploaded Successfully");
      console.log("File Uploaded Successfully");
      return res.status(200).send("Data Uploaded successfully");
    });
  });
};

const handleUpload = async (req, res, next) => {
  try {
    await uploadPromise(req, res, next);
  } catch (error) {
    console.error("Error handling upload:", error);
    return res.status(500).send(error); // Send appropriate error message
  }
};

module.exports = handleUpload;
