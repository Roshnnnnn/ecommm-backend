const express = require("express");
const { createUser } = require("../controller/Auth");

const router = express.Router();

router.post("/signup", createUser);

exports.router = router;
