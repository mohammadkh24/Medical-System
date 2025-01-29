const express = require("express");
const authMiddlewares = require("../middlewares/auth");
const isAdminMiddlewares = require("../middlewares/isAdmin");
const usersControllers = require("../controllers/users");

const router = express.Router();

router
  .route("/")
  .get(authMiddlewares, isAdminMiddlewares, usersControllers.getAll);

router
  .route("/:id")
  .get(authMiddlewares, isAdminMiddlewares, usersControllers.getOne)
  .delete(authMiddlewares, isAdminMiddlewares, usersControllers.remove);

router.route("/:id/role").put(authMiddlewares , isAdminMiddlewares , usersControllers.changeRole)  


module.exports = router;
