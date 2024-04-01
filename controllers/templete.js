const Templete = require("../models/templete");
const MetaData = require("../models/metadata");

exports.addTemplete = async (req, res, next) => {
  const { templeteData, metaData } = req.body;
  try {
    const templeteResult = await Templete.create({
      name: templeteData.name,
    });

    await metaData.forEach((current) => {
      MetaData.create({
        attribute: current.attribute,
        coordinateX: current.coordinateX,
        coordinateY: current.coordinateY,
        width: current.width,
        height: current.height,
        templeteId: templeteResult.id,
      });
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

exports.getTempleteData = async (req, res, next) => {
  try {
    const templeteId = req.params.id;
    const templete = await Templete.findByPk(templeteId, {
      include: MetaData,
    });

    if (!templete) {
      // Handle case where the template with the given ID doesn't exist
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(templete);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
