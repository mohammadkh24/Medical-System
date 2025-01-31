const { body } = require("express-validator");

const turnValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),

    body("age")
      .notEmpty()
      .withMessage("Age can't be empty")
      .isNumeric()
      .withMessage("Age must be a number"),

    body("phone")
      .notEmpty()
      .withMessage("Phone can't be empty")
      .isMobilePhone(["fa-IR"])
      .withMessage("Invalid phone number"),

    body("email")
      .notEmpty()
      .withMessage("Email can't be empty")
      .isEmail()
      .withMessage("Invalid email address"),

    body("body")
      .notEmpty()
      .withMessage("Body can't be empty")
      .isLength({ min: 10 })
      .withMessage("Body must be at least 10 characters long"),

    body("doctorID")
      .notEmpty()
      .withMessage("DoctorID can't be empty")
      .isMongoId()
      .withMessage("Invalid DoctorID"),

    body("timeID")
      .notEmpty()
      .withMessage("TimeID can't be empty")
      .isMongoId()
      .withMessage("Invalid TimeID"),
  ];
};

module.exports = { turnValidator };
