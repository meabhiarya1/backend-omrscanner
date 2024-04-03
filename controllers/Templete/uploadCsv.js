const multer = require("multer");
const XLSX = require("xlsx");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "csvFile/");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now() / 1000;
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("csvFile");
// In single file key should be here like csvFile

const uploadCsv = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }

    try {
      // Read the uploaded CSV file
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data into JSON format
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Insert data into the database using Sequelize
      // await AnswerSheet.bulkCreate(jsonData);

      console.log(jsonData);

      // Send a response indicating success
      console.log("Data inserted into database successfully");
      return res.status(200).send("Data inserted into database successfully");
    } catch (error) {
      console.error("Error inserting data into database:", error);
      return res.status(500).send("Error inserting data into database");
    }
  });
};

module.exports = uploadCsv;
