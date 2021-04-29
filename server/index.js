const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const { db } = require("./db");

// Initialize App
const app = express();

// Middleware
app.use(morgan("dev"));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// API Routes
app.use("/", require("./apiRoutes"));

// 404 Handling
app.use((req, res, next) => {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.use("*", (req, res) => {
  res.send("Welcome");
});

// 500 Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Start Server
const PORT = process.env.PORT || 3000;
const server = db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`);
  });
});

const io = require("socket.io")(server);
require("./socket")(io);

module.exports = app;
