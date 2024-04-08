const fs = require("fs");
const path = require("path");
const Files = require("../../models/TempleteModel/files");
const AdmZip = require("adm-zip");

const getImage = async (req, res, next) => {
  const fileId = req.params.id;
  const { image } = req.body;
  // console.log(image, fileId);

  try {
    if (!fileId || !image) {
      return res
        .status(400)
        .json({ error: "File ID or image name not provided" });
    }

    const fileData = await Files.findOne({ where: { id: fileId } });

    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    const filename = fileData.zipFile;
    const zipFilePath = path.join(__dirname, "../../zipFile", filename);
    // console.log(zipFilePath);

    if (!fs.existsSync(zipFilePath)) {
      return res.status(404).json({ error: "Zip file not found" });
    }

    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();
    const matchingEntry = zipEntries.find((entry) =>
      entry.entryName.includes(image)
    );

    if (!matchingEntry) {
      return res.status(404).json({ error: "Image not found in the zip file" });
    }

    const imageData = zip.readFile(matchingEntry);
    res.writeHead(200, {
      "Content-Type": "image/jpg", // You may need to adjust the content type based on the image format
      "Content-Length": imageData.length,
    });

    res.end(imageData);
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getImage;
