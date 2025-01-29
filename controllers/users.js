const { isValidObjectId } = require("mongoose");
const usersModel = require("../models/users");

exports.getAll = async (req, res) => {
  const users = await usersModel.find({}).lean();

  return res.json(users);
};
exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const user = await usersModel.findOne({ _id: id }).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User Not Found !!",
    });
  }

  return res.json(user);
};

exports.changeRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const changeRole = await usersModel.findOneAndUpdate(
    { _id: id },
    {
      role,
    }
  );

  if (!changeRole) {
    return res.status(404).json({
      message: "User Not Found !!",
    });
  }

  return res.status(200).json({
    message: "User Role Changed Successfully",
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const removeUser = await usersModel.findOneAndDelete({ _id: id });

  if (!removeUser) {
    return res.status(404).json({
      message: "User Not Found !!",
    });
  }

  return res.status(201).json({
    message: "User Removed Successfully",
  });
};
