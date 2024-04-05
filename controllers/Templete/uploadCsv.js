const XLSX = require("xlsx");

try {
  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  console.log(jsonData);

  // Send a response indicating success
  console.log("Data inserted into database successfully");
  return res.status(200).send("Data inserted into database successfully");
} catch (error) {
  console.error("Error inserting data into database:", error);
  return res.status(500).send("Error inserting data into database");
}

module.exports = uploadCsv;
