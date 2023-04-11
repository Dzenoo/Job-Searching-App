const express = require("express");
const seekerControllers = require("../controllers/seeker-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    check("first_name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("last_name").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  seekerControllers.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  seekerControllers.login
);

router.get("/:seekerId/profile", seekerControllers.getProfile);

module.exports = router;
