const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const Files = require("../../models/TempleteModel/files");

const handleData = async (req, res, next) => {
  const mappedData = req.body;
  console.log(mappedData);
  try {
    if (!mappedData.fileId) {
      return res.status(400).json({ error: "File not provided" });
    }

    Files.findOne({ where: { id: mappedData.fileId } }).then((fileData) => {
      // console.log(fileData.csvFile)
      if (!fileData.csvFile) {
        return res.status(404).json({ error: "File not exists" });
      }
      const filename = fileData.csvFile;
      // console.log(filename);
      const filePath = path.join(__dirname, "../../csvFile", filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      const newDataKeys = Object.keys(data[0]);
      const newHeaders = Object.values(mappedData);

      newHeaders.pop();
      // console.log(newDataKeys);
      // console.log(newHeaders);

      // if (newDataKeys.length !== newHeaders.length) {
      //   return res.status(400).json({ error: "Mapped data headers mismatch" });
      // }

      const mergedObject = newDataKeys.reduce((acc, key, index) => {
        acc[key] = newHeaders[index];
        return acc;
      }, {});


      if (JSON.stringify(data[0]) !== JSON.stringify(mergedObject)) {
        data.unshift(mergedObject);
      }

      // console.log(data)
      const csvData = XLSX.utils.json_to_sheet(data);
      // console.log(filePath);
      fs.unlinkSync(filePath);

      XLSX.writeFile(
        { SheetNames: [sheetName], Sheets: { [sheetName]: csvData } },
        filePath
      );

      res.status(200).json("Header added successfully");
    });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = handleData;
