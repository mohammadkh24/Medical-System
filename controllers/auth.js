const usersModel = require("../models/users");
const registerValidation = require("../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const validationResult = registerValidation(req.body);

  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }

  const { name, email, phone, password } = req.body;

  const isUserExists = await usersModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "Phone or Email is duplicated !!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const countOfUsers = await usersModel.countDocuments();

  const user = await usersModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return res.status(201).json({
    message: "User Registered Successfully",
    user: userObject,
    token: accessToken,
  });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await usersModel.findOne({ phone });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found !!",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Password is not valid !!",
    });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return res.json({ accessToken });
};

exports.getMe = async (req, res) => {
    const user = await usersModel.findById(req.user._id).select("-password")

    if (!user) {
        return res.status(404).json({
            message : "User Not Found !!"
        })
    };

    return res.json(user)
};
