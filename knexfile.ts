require("dotenv").config({ path: "./.env.development" });

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: "ts",
  },
};
