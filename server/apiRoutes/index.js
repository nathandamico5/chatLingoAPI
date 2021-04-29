const router = require("express").Router();

// GET /api
router.get("/", (req, res, next) => {
  try {
    res.send("ChatLingo API");
  } catch (error) {
    next(error);
  }
});

router.use("/auth", require("./authRoutes"));
router.use("/messages", require("./messagesRoutes"));

// 404 Error Handling
router.use((req, res, next) => {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

module.exports = router;
