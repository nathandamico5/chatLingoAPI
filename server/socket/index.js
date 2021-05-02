module.exports = (io) => {
  io.use((socket, next) => {
    console.log("hello");
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    console.log(socket.id, "is", socket.username);
    next();
  });

  io.on("connection", (socket) => {
    console.log(
      socket.id,
      socket.username,
      " has made a persistent connection to the server!"
    );

    socket.on("new-message", (message) => {
      //listening for a new message.
      socket.broadcast.emit("new-message", message);
    });
  });
};
