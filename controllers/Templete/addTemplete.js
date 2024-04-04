const Templete = require("../../models/TempleteModel/templete");
const MetaData = require("../../models/TempleteModel/metadata");
const Files = require("../../models/TempleteModel/files");

const addTemplete = async (req, res, next) => {
  const { templateData, metaData } = req.body;
  console.log(templateData, metaData);
  try {
    const templeteResult = await Templete.create({
      name: templateData.name,
    });
    // console.log(templeteResult);
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

module.exports = addTemplete;
