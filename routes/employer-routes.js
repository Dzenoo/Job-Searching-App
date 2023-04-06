const express = require("express");
const employerControllers = require("../controllers/employer-controllers");

const router = express.Router();

router.post("/signup", employerControllers.signup);

router.post("/login", employerControllers.login);

router.get("/:employerId/profile", employerControllers.getProfile);

module.exports = router;
