const express = require("express");
const newsletterControllers = require("../controllers/newsletter");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [check("email").normalizeEmail().isEmail()],
  newsletterControllers.signupForNewsletter
);

module.exports = router;
