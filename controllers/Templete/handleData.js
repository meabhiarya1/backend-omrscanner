const XLSX = require("xlsx");
const fs = require("fs");

const handleData = async (req, res, next) => {

  const mappedData = req.body;
  //   console.log(mappedData);
  const filePath = mappedData.filePath;

  if (fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  const newData = Object.keys(data[0]);
  const newHeaders = Object.values(mappedData);
  newHeaders.pop();

  // let objArray = [];
  // for (let i = 0; i < newData.length; i++) {
  //   objArray.push({ [newData[i]]: newHeaders[i] });
  // }
  // const mergedObject = objArray.reduce((acc, obj) => {
  //   const [key, value] = Object.entries(obj)[0]; // Extract key-value pair from the object
  //   acc[key] = value; // Assign key-value pair to the accumulator object
  //   return acc;
  // }, {});

  const mergedObject = newData.reduce((acc, key, index) => {
    acc[key] = newHeaders[index];
    return acc;
  }, {});

  data.unshift(mergedObject);

  const csvData = XLSX.utils.json_to_sheet(data);
  fs.unlinkSync(filePath);
  XLSX.writeFile(
    { SheetNames: [sheetName], Sheets: { [sheetName]: csvData } },
    filePath
  );
  res.status(200).json(data);
};

module.exports = handleData;
