const express = require("express");
const seekerControllers = require("../controllers/seeker-controllers");

const router = express.Router();

router.post("/signup", seekerControllers.signup);

router.post("/login", seekerControllers.login);

module.exports = router;
