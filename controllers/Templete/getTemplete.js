const Templete = require("../../models/TempleteModel/templete");
const MetaData = require("../../models/TempleteModel/metadata");

const getTemplete = (req, res, next) => {
  try {
    Templete.findAll({
      include: [
        {
          model: MetaData,
          attributes: {
            exclude: ["id", "templeteId", "createdAt", "updatedAt"], // Specify the fields to be excluded
          },
        },
      ],
    }).then((data) => {
      // console.log(data.dataValues.templetedata)
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTemplete;
