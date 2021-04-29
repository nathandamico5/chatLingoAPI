const Sequelize = require("sequelize");
const db = require("../database");

const Message = db.define("message", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Message;
