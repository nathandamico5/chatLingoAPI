const { db, User } = require("./index.js");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // Seed Users
    const test = await User.create({
      username: "test",
      password: "123",
    });
    const user = await User.create({
      username: "user",
      password: "123",
    });

    // Seed Messages
    await user.createMessage({
      content: "hello",
    });
    await test.createMessage({
      content: "how are you?",
    });

    // // Assign Messages
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
