const express = require("express");
const turnController = require("../controllers/turn");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const isDoctorMiddleware = require("../middlewares/isDoctor");
const validateMiddleware = require("../middlewares/validate");
const { turnValidator } = require("../validators/turn");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, turnController.getAll);
router
  .route("/reserve")
  .post(turnValidator(),validateMiddleware ,authMiddleware, turnController.create);
router.route("/seen").get(authMiddleware, isDoctorMiddleware , turnController.seen);
router.route("/:id").delete(authMiddleware, turnController.remove);
router.route("/:id/accept").put(authMiddleware, isDoctorMiddleware , turnController.accept);
router.route("/:id/reject").put(authMiddleware, isDoctorMiddleware , turnController.reject);

module.exports = router;
