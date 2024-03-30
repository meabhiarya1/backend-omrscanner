const Templete = require("../models/templete");

const sequelize = require("../util/database");

exports.addTemplete = async (req, res, next) => {
    
  const { name, rollno, school, subject } = req.body;
  try {
    const templete = Templete.create({
      name,
      rollno,
      school,
      subject,
    });
    res.status(200).json(templete);
  } catch (error) {
    console.log(error);
  }
};
