const Templete = require("../models/templete");
const MetaData = require("../models/metadata");

exports.addTemplete = async (req, res, next) => {
  const { templeteData, metaData } = req.body;
  try {
    const result = await Templete.create({
      name: templeteData.name,
    });

    await MetaData.create({
      attribute: metaData.attribute,
      coordinateX: metaData.coordinateX,
      coordinateY: metaData.coordinateY,
      width: metaData.width,
      height: metaData.height,
      templeteId: result.id,
    });

    res.status(200).json({ message: "Created Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTemplete = async (req, res, next) => {
  try {
    await Templete.findAll().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
