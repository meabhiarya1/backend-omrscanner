const Templete = require("../../models/TempleteModel/templete");
const MetaData = require("../../models/TempleteModel/metadata");

const getTemplete = async (req, res, next) => {
  try {
    await Templete.findAll().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTemplete;
