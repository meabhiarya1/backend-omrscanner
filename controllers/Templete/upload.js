const multer = require("multer");
const XLSX = require("xlsx");
const Files = require("../../models/TempleteModel/files");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = ["zip", "zipx", "jar", "apk", "ipa", "cbz", "7z"];
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

const uploadPromise = (req, res, next, id, imageColName) => {
  console.log(imageColName);
  return new Promise((resolve, reject) => {
    // console.log(userId);
    upload(req, res, async function (err) {
      if (err) {
        console.error("Error uploading files:", err);
        return reject("Error uploading files");
      }
      try {
        // Update database with file names
        const createdFile = await Files.create({
          csvFile: req.files.csvFile[0].filename,
          zipFile: req.files.zipFile[0].filename,
          templeteId: id,
        });
        const filePath = path.join(
          __dirname,
          "../../csvFile",
          req.files.csvFile[0].filename
        );
        console.log(filePath);
        if (fs.existsSync(filePath)) {
          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          // console.log(worksheet)
          const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

          const updatedJson = data.map((obj) => {
            return obj;
          });
          // console.log(updatedJson)
          updatedJson.forEach((obj) => {
            const imagePath = obj["Page 1 Image"];
            const parts = imagePath.split("\\");
            const filename = parts[parts.length - 1];
            obj["Page 1 Image"] = filename;
          });

          //   // Convert JSON data back to CSV format
          const csvData = XLSX.utils.json_to_sheet(updatedJson);

          fs.unlinkSync(filePath);
          XLSX.writeFile(
            { SheetNames: [sheetName], Sheets: { [sheetName]: csvData } },
            filePath
          );
          res.status(200).json({ fileId: createdFile.id });
        } else {
          res.status(404).json({ error: "File not found" });
        }
        console.log("File Uploaded Successfully");
        resolve("File Uploaded Successfully");
      } catch (error) {
        console.error("Error updating database:", error);
        reject("Error updating database");
      }
    });
  });
};

const handleUpload = async (req, res, next) => {
  try {
    await uploadPromise(req, res, next, req.params.id, req.query.imageColName);
    console.log("Files Uploaded successfully");
  } catch (error) {
    console.error("Error handling upload:", error);
    return res.status(500).send(error);
  }
};

module.exports = handleUpload;
