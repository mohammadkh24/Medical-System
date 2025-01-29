const express = require("express");
const turnController = require("../controllers/turn")
const authMiddleware = require("../middlewares/auth")


const router = express.Router();

router.route("/").get(authMiddleware , turnController.getAll)
router.route("/reserve").post(authMiddleware , turnController.reserve)
router.route("/seen").post(authMiddleware , turnController.seen)
router.route("/:id").delete(authMiddleware , turnController.remove)

module.exports = router