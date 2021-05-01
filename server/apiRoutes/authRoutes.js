const router = require("express").Router();
const { User } = require("../db/index");

// Require Token Auth Middleware
const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

// POST /auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, language } = req.body;
    const user = await User.create({ username, password, language });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

// GET /auth
router.get("/", requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// PUT /auth
router.put("/", requireToken, async (req, res, next) => {
  try {
    const { language } = req.body;
    req.user.language = language;
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
