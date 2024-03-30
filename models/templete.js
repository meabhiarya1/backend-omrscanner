const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Templete = sequelize.define("templetes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Templete;
