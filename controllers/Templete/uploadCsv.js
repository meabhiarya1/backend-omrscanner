const multer = require('multer');
const XLSX = require('xlsx');

const uploadCsv = async (req, res, next) => {
  const csvFile = req.body
  try {
    if (!csvFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Read the uploaded Excel file
    const workbook = XLSX.readFile(csvFile.path);
    console.log(workbook);
    res.status(200).json({ message: "File uploaded successfully" });

    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data into JSON format
    // const jsonData = XLSX.utils.sheet_to_json(sheet);
    // jsonData is now an array of objects representing the rows in the Excel file
    // console.log(jsonData);
    // You can now process the jsonData as needed
    // res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = uploadCsv;
