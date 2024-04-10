const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const MetaData = require("../../models/TempleteModel/metadata");
const cropImage = require("../../services/sharpImageCropper");

const getImage = async (req, res, next) => {
  const { imageName, id } = req.body;
  // console.log(imageName, id);

  if (!imageName || !id) {
    return res.status(500).json("Id or ImageName is Missing");
  }

  const sourceFilePath = path.join(
    __dirname,
    "..",
    "..",
    "extractedFiles",
    imageName
  );

  if (!sourceFilePath) {
    return res.status(500).json("File not Found");
  }
  
  try {
    // Read the TIFF file
    const image = await Jimp.read(sourceFilePath);
    const bufferImage = await image.getBufferAsync(Jimp.MIME_JPEG);
    const base64Image = bufferImage.toString("base64");

    const data = await MetaData.findAll({
      where: { templeteId: id },
    });
    if (data.length === 0) {
      return res.status(500).json("Id is Incorrect");
    }
    const allImages = await Promise.all(
      data.map(async (item, index) => {
        const { attribute, coordinateX, coordinateY, width, height } =
          item.dataValues;

        const coordinates = {
          x: Math.ceil(coordinateX),
          y: Math.ceil(coordinateY),
          width: Math.ceil(width),
          height: Math.ceil(height),
        };

        const imageUrl = await cropImage(base64Image, coordinates);
        return { attribute, imageUrl };
      })
    );
    // Send the buffer image as a response
    res.status(200).json({ base64Image, croppedImages: allImages });
  } catch (err) {
    // Handle errors
    console.error("Error converting image:", err);
    res.status(500).send("Error converting image.");
  }
};

module.exports = getImage;
