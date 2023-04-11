const express = require("express");
const employerControllers = require("../controllers/employer-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    check("em_name").not().isEmpty(),
    check("em_email").normalizeEmail().isEmail(),
    check("em_password").not().isEmpty(),
    check("em_phone").not().isEmpty(),
    check("em_salary").not().isEmpty(),
    check("em_employees").not().isEmpty(),
    check("em_biography").not().isEmpty(),
  ],
  employerControllers.signup
);

router.post(
  "/login",
  [
    check("em_email").normalizeEmail().isEmail(),
    check("em_password").not().isEmpty(),
  ],
  employerControllers.login
);

router.get("/:employerId/profile", employerControllers.getProfile);

router.get("/companies", employerControllers.getCompanies);

router.get("/companies/:companyId", employerControllers.getCompany);

module.exports = router;
