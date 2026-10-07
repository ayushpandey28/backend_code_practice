const express = require("express");
const router = express.Router();
const {registeredUser,loginUser,regUser,logout} = require("../middleware/controller/authController");

router.post("/logout", logout);
router.post("/register", regUser);
router.post("/login", loginUser);
module.exports = router;
