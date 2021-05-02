const router = require("express").Router();
const { Message, User } = require("../db/index");
const requireToken = require("./authMiddleware");
const { Op } = require("sequelize");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ toID: 0 }, { toID: req.user.id }, { userId: req.user.id }],
      },
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const content = req.body.message;
    const toID = req.body.toID;
    const message = await req.user.createMessage({
      content,
      toID,
    });
    const newMessage = await Message.findOne({
      where: {
        id: message.id,
      },
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    res.send(newMessage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
