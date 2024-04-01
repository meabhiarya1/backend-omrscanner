const Templete = require("../../models/TempleteModel/templete");
const MetaData = require("../../models/TempleteModel/metadata");

const getTempleteData = async (req, res, next) => {
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

module.exports = getTempleteData;
