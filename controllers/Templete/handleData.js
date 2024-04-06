const XLSX = require("xlsx");
const fs = require("fs");
const Files = require("../../models/TempleteModel/files");
const path = require("path");

const handleData = async (req, res, next) => {
  const mappedData = req.body;
  console.log(mappedData);
  try {
    if (!mappedData.fileId) {
      return res.status(400).json({ error: "File not provided" });
    }
    Files.findOne({ where: { id: mappedData.fileId } }).then((fileData) => {
      const filename = fileData.csvFile;
      const filePath = path.join(__dirname, "../../csvFile", filename);
      // console.log(filePath);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // console.log(data);
      fs.unlinkSync(filePath);
      res.status(200).json(data);
    });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = handleData;
