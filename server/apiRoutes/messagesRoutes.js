const router = require("express").Router();
const { Message } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const content = req.body.message;
    const message = await Message.create({
      content,
    });
    res.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
