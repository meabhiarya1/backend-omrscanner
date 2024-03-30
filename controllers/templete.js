const Templete = require("../models/templete");
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

exports.addTemplete = async (req, res, next) => {
  const { templeteName, columnData } = req.body;
  try {
    // const values = [name, rollno, school, subject];
    // const numValues = values.filter(Boolean).length;
    const dynamicModel = sequelize.define(
      templeteName,
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
      },
      { timestamps: false }
    );

    // Synchronize the model definition with the database to create the table
    await dynamicModel.sync();

    res
      .status(200)
      .json({ message: `Table ${tableName} created successfully` });

    // const columnNames = [];
    // for (let i = 0; i < numValues; i++) {
    //   const columnName = values[i];
    //   columnNames.push(columnName);
    //   await sequelize.query(
    //     `ALTER TABLE templetes ADD COLUMN ${columnName} VARCHAR(255);`
    //   );
    // }

    // console.log("here it is>>>>>>>>>>>>", columnNames);

    // const templeteData = {};
    // for (let i = 0; i < numValues; i++) {
    //   const columnName = `value_${i + 1}`;
    //   templeteData[columnName] = values[i];
    // }

    // const templete = await Templete.create(templeteData);
    // res.status(200).json(templete);
  } catch (error) {
    console.log(error);
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
