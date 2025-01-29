const userModel = require("../models/users");
const turnModel = require("../models/turn");
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const turns = await turnModel.find({}).lean();

  return res.json(turns);
};

exports.create = async (req, res) => {
  const { name, age, phone, email, body, doctorID } = req.body;

  if (!isValidObjectId(doctorID)) {
    return res.status(400).json({
      message: "DoctorID is not valid !!",
    });
  }

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};
    result.errors.forEach((error) => {
      errors[error.path] = error.msg;
    });
    return res.status(400).json({ errors });
  }

  const doctor = await userModel.findOne({ _id: doctorID, role: "DOCTOR" });

  if (!doctor) {
    return res.status(404).json({
      message: "Doctor Not Found !!",
    });
  }

  const newTurn = await turnModel.create({
    name,
    age,
    phone,
    email,
    body,
    doctorID,
    creator: req.user._id,
    status: "WAITING",
  });

  return res.status(201).json({
    message: "New Turn Reserved Successfully",
    newTurn,
  });
};

exports.seen = async (req, res) => {
  const turns = await turnModel.find({ doctorID: req.user._id });

  return res.json(turns);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "TurnID is not valid !!",
    });
  }

  const removeTurn = await turnModel.findOneAndDelete({ _id: id });

  if (!removeTurn) {
    return res.status(404).json({
      message: "Turn Not Found !!",
    });
  }

  return res.json({
    message: "Turn Removed Successfully",
    removeTurn,
  });
};

exports.accept = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "TurnID is not Valid",
    });
  }

  const acceptTurn = await turnModel.findOneAndUpdate(
    { _id: id },
    {
      status: "ACCEPTED",
    }
  );

  if (!acceptTurn) {
    return res.status(404).json({
      message: "Turn Not Found !!",
    });
  }

  return res.status(201).json({
    message: "Turn Accepted Successfully",
    acceptTurn,
  });
};
exports.reject = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "TurnID is not Valid",
    });
  }

  const rejectTurn = await turnModel.findOneAndUpdate(
    { _id: id },
    {
      status: "REJECTED",
    }
  );

  if (!rejectTurn) {
    return res.status(404).json({
      message: "Turn Not Found !!",
    });
  }

  return res.status(201).json({
    message: "Turn Rejected Successfully",
    rejectTurn,
  });
};
