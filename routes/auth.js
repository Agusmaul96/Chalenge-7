const express = require("express");
router = express.Router();
const auth = require("../controller/authController");
// const { Login, Signup, loginAuth, newUser } = require("../controller/authController");

router.get("/login", auth.Login);
router.post("/login/auth", auth.loginAuth);
// router.post("/login", auth.login);

router.get("/signup", auth.Signup);
router.post("/signup", auth.register);

router.get("/signout", auth.logout);
module.exports = router;
