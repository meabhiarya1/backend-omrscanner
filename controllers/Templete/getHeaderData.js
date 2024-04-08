const Files = require("../../models/TempleteModel/files");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const getHeaderData = (req, res, next) => {
  // console.log(req.params.id);
  try {
    Files.findOne({ where: { templeteId: req.params.id } }).then((fileData) => {
      if (!fileData) {
        return res.status(404).json({ error: "File not found" });
      }
      const fileName = fileData.csvFile;
      const filePath = path.join(__dirname, "../../csvFile", fileName);

      if (fs.existsSync(filePath)) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        res.status(200).json(Object.keys(data[0]));
      } else {
        res.status(404).json({ error: "File not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getHeaderData;
