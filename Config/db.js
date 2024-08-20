const mongoose = require("mongoose");

const URI = process.env.URI;

function connectToDB() {
  mongoose
    .connect(URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Could not connect to DB", err));
}

module.exports = { connectToDB };
