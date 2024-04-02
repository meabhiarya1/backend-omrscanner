const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const AnswerSheet = sequelize.define("answersheet", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  candidateName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  schoolName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Q1: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Q2: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Q3: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Q4: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  images: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = AnswerSheet;
