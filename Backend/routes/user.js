const express = require("express");
const router = express.Router();

// Controller Function
const { signUp, logIn } = require("../controller/userController");

// login
router.post("/login", logIn);

// signup
router.post("/signup", signUp);

module.exports = router;
