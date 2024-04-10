

function cropImage(base64Image, coordinates) {
  // Create an Image object
  const img = new Image();
  img.src = "data:image/jpeg;base64," + base64Image;

  // Create a canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = coordinates.width;
  canvas.height = coordinates.height;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    img,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height,
    0,
    0,
    coordinates.width,
    coordinates.height
  );

  // Get the cropped image as a Base64 string
  const croppedBase64Image = canvas.toDataURL("image/jpeg").split(",")[1];

  // Return the cropped Base64 string
  return croppedBase64Image;
}

module.exports = cropImage;
