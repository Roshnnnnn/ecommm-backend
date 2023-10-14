// const express = require("express");
// const { createUser } = require("../controller/Auth");
// const passport = require("passport");

// const router = express.Router();
// //  /auth is already added in base path
// router.post("/signup", createUser);
// .post("/login", passport.authenticate("local"), loginUser)
// .get("/check", passport.authenticate("jwt"), checkAuth);
// exports.router = router;

const express = require("express");
const { createUser } = require("../controller/Auth");

const router = express.Router();

router.post("/", createUser);

exports.router = router;
