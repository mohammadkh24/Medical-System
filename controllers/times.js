const { isValidObjectId } = require("mongoose");
const timesModel = require("../models/times");
const { validationResult } = require("express-validator");

exports.getAll = async (req, res) => {
  const times = await timesModel.find({}).lean().populate("doctorID", "name");

  return res.json(times);
};
exports.create = async (req, res) => {
  const { inLetters, inNumbers } = req.body;

  const createTime = await timesModel.create({
    inLetters,
    inNumbers,
    doctorID: req.user._id,
  });

  return res.status(201).json({
    message: "Time Created Successfully",
    time: createTime,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "TimeID is not valid !!",
    });
  }

  const editTime = await timesModel.findOneAndUpdate(
    { _id: id },
    {
      inLetters: req.body.inLetters,
      inNumbers: req.body.inNumbers,
    }
  );

  if (!editTime) {
    return res.status(404).json({
      message: "Time Not Found !!",
    });
  }

  return res.status(200).json({
    message: "Time Edited Successfully",
    editTime,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "TimeID is not valid !!",
    });
  }

  const removeTime = await timesModel.findOneAndDelete({ _id: id });

  if (!removeTime) {
    return res.status(404).json({
      message: "Time Not Found !!",
    });
  }

  return res.json({
    message: "Time Removed Successfully",
    time: removeTime,
  });
};
