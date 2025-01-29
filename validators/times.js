const { body } = require("express-validator");

const timeValidator = () => {
  return [
    body("inLetters").notEmpty().withMessage("inLetters can't be empty"),
    body("inNumbers").notEmpty().withMessage("inNumbers can't be empty").isNumeric().withMessage("inNumbers can't be empt"),
  ];
};

module.exports = { timeValidator };
