const db = require("./database");
const User = require("./models/User");
const Message = require("./models/Message");

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {
  db,
  User,
  Message,
};
