const express = require("express");
const applyControllers = require("../controllers/apply-controllers");

const router = express.Router();

router.post("/:jobId/:seekerId/:employerId/apply", applyControllers.applyToJob);

router.post("/:applicationId/updateStatus", applyControllers.updateStatus);

module.exports = router;
