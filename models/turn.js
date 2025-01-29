const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACCEPTED", "REJECTED", "WAITING"],
    },
    doctorID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    timeID: {
      type: mongoose.Types.ObjectId,
      ref: "Time",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Turn", schema);

module.exports = model;
