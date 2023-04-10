const express = require("express");
const newsletterControllers = require("../controllers/newsletter");

const router = express.Router();

router.post("/signup", newsletterControllers.signupForNewsletter);

module.exports = router;
