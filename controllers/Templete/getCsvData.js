const XLSX = require("xlsx");
const fs = require("fs");

const getCsvData = async (req, res, next) => {
  const { filePath } = req.body;
//   console.log(mappedData);

//   const filePath = mappedData.filePath;

//   if (fs.existsSync(filePath)) {
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

//     const newData = Object.keys(data[0]);
//     const newHeaders = Object.values(mappedData);
//     newHeaders.pop();

//     const mergedObject = newData.reduce((acc, key, index) => {
//       acc[key] = newHeaders[index];
//       return acc;
//     }, {});

//     data.unshift(mergedObject);
//     const csvData = XLSX.utils.json_to_sheet(data);
//     fs.unlinkSync(filePath);
//     XLSX.writeFile(
//       { SheetNames: [sheetName], Sheets: { [sheetName]: csvData } },
//       filePath
//     );
//     res.status(200).json({ filePath });
//   } else {
//     res.status(404).json({ error: "File not found" });
//   }
};

module.exports = getCsvData;
