const { db, User } = require("./index.js");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // Seed Users
    const nathan = await User.create({
      username: "nathan",
      password: "123",
      language: "es",
    });
    await User.create({
      username: "ambar",
      password: "12345",
      langauge: "en",
    });
    await User.create({
      username: "Ronny",
      password: "123",
      language: "zh",
    });
    await User.create({
      username: "James",
      password: "123",
      language: "ar",
    });

    // Seed Messages
    await nathan.createMessage({
      content: "hello",
      toID: 0,
    });
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
