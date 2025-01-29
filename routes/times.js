const express = require("express");
const timesController = require("../controllers/times");
const authMiddleware = require("../middlewares/auth");
const isDoctorMiddleware = require("../middlewares/isDoctor");
const { timeValidator } = require("../validators/times");

const router = express.Router();

router
  .route("/")
  .get(timesController.getAll)
  .post(
    timeValidator(),
    authMiddleware,
    isDoctorMiddleware,
    timesController.create
  );

router
  .route("/:id")
  .delete(authMiddleware, isDoctorMiddleware, timesController.remove);

router
  .route("/:id/edit")
  .put(authMiddleware, isDoctorMiddleware, timesController.edit);

module.exports = router;
