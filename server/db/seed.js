const { db, User } = require("./index.js");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // Seed Users
    await User.create({
      username: "nathan",
      password: "123",
      language: "en",
    });
    await User.create({
      username: "user",
      password: "123",
      langauge: "es",
    });
    await User.create({
      username: "Ronny",
      password: "123",
      language: "zh",
    });

    // Seed Messages
    // await nathan.createMessage({
    //   content: "hello",
    // });
    // await james.createMessage({
    //   content: "como estas?",
    // });
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Something went wrong while seeding!");
      console.error(err);
      db.close();
    });
}
