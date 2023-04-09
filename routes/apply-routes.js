const express = require("express");
const applyControllers = require("../controllers/apply-controllers");

const router = express.Router();

router.post("/:jobId/:seekerId/apply", applyControllers.applyToJob);

module.exports = router;
