const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const { db } = require("./db");

// Initialize App
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`);
  });
});

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

io.on("connection", function (socket) {
  console.log(socket.id, "connected to the WebSocket");

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });

  socket.on("new-message", function (msg) {
    console.log("Received a new message");
    io.emit("new-message", msg);
  });
});

module.exports = app;
