const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    inLetters: {
      type: String,
      required: true,
    },
    inNumbers: {
      type: String,
      required: true,
    },
    doctorID: {
      type: mongoose.Types.ObjectId,
      ref : "User"
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Time", schema);

module.exports = model;
