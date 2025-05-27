const mongoose = require("mongoose");
const dbconnect = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connection with DB successful"))
    .catch((error) => console.log("Cannot connect to DB", error));
};
module.exports = dbconnect;