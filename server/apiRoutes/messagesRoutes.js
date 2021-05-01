const router = require("express").Router();
const { Message, User } = require("../db/index");
const requireToken = require("./authMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll({
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
    const message = await req.user.createMessage({
      content,
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
