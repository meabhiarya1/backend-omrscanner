const fs = require("fs").promises;
const path = require("path");

const getImage = async (req, res, next) => {
  try {
    const { imageName, id } = req.body;
    // console.log(imageName)
    // return

    if (!imageName || !id) {
      return res.status(400).json({ error: "Id or ImageName is Missing" });
    }

    const sourceFilePath = path.join(
      __dirname,
      "..",
      "..",
      "extractedFiles",
      imageName
    );

    const sourceFileExists = await fs
      .access(sourceFilePath)
      .then(() => true)
      .catch(() => false);

    if (!sourceFileExists) {
      return res.status(404).json({ error: "File not found" });
    }

    // Check if source file exists
    // const sourceFileExists = await fs
    //   .access(sourceFilePath)
    //   .then(() => true)
    //   .catch(() => false);
    //

    // Read the TIFF file
    // const image = await Jimp.read(sourceFilePath);
    // const bufferImage = await image.getBufferAsync(Jimp.MIME_PNG);
    // const base64Image = bufferImage.toString("base64");

    // const base64Image = sourceFilePath.toString("base64");

    // const data = await MetaData.findAll({ where: { templeteId: id } });
    // if (data.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "No data found for the provided Id" });
    // }

    // const allImages = await Promise.all(
    //   data.map(async (item) => {
    //     const { attribute, coordinateX, coordinateY, width, height } =
    //       item.dataValues;

    //     const coordinates = {
    //       x: Math.ceil(coordinateX),
    //       y: Math.ceil(coordinateY),
    //       width: Math.ceil(width),
    //       height: Math.ceil(height),
    //     };

    //     // const imageUrl = await cropImage(base64Image, coordinates);
    //     return { attribute, imageUrl };
    //   })
    // );

    // Send the buffer image and cropped images as a response

    // console.log(sourceFilePath);
    // return;

    const image = await fs.readFile(sourceFilePath);
    const base64Image = image.toString("base64");

    res.status(200).json({ base64Image });
  } catch (err) {
    // Handle errors
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getImage;
