const express = require("express");
const router = express.Router();

const {
  login,
  register,
  resetPassword,
  changePassword,
  getCurrentUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/reset", resetPassword);
router.post("/changePassword", authMiddleware, changePassword);

router.get("/user", authMiddleware, getCurrentUser);

module.exports = router;
