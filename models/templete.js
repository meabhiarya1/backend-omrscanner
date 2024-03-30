const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Templete = sequelize.define("templetes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  rollno: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  school: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Templete;
