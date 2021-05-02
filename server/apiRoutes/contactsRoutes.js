const router = require("express").Router();
const { User } = require("../db/index");
const { Op } = require("sequelize");
const requireToken = require("./authMiddleware");

// GET User Contacts
router.get("/", requireToken, async (req, res, next) => {
  try {
    const contacts = await User.findAll({
      where: {
        id: {
          [Op.not]: req.user.id,
        },
      },
      attributes: ["id", "username"],
    });
    res.send(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
