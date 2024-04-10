const sharp = require('sharp');

async function cropImage(base64Image, coordinates) {
  const inputBuffer = Buffer.from(base64Image, "base64");

  // Crop the image
  const croppedBuffer = await sharp(inputBuffer)
    .extract({
      left: coordinates.x,
      top: coordinates.y,
      width: coordinates.width,
      height: coordinates.height,
    })
    .toBuffer();

  // Convert the cropped buffer to a Base64 string
  const croppedBase64Image = croppedBuffer.toString("base64");

  return croppedBase64Image;
}

module.exports = cropImage;
