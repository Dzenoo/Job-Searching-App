const express = require("express");
const applyControllers = require("../controllers/apply-controllers");
const { check } = require("express-validator");
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.post(
  "/:jobId/:seekerId/:employerId/apply",
  fileUpload.single("cv"),
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phone").not().isEmpty(),
    check("github").not().isEmpty(),
    check("linkedin").not().isEmpty(),
  ],
  applyControllers.applyToJob
);

router.post("/:applicationId/updateStatus", applyControllers.updateStatus);

module.exports = router;
