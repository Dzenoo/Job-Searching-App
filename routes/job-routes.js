const express = require("express");
const jobControllers = require("../controllers/job-controllers");

const router = express.Router();

router.post("/new", jobControllers.newJob);

router.get("/", jobControllers.getJobs);

router.get("/:jobId", jobControllers.getJob);

router.delete("/:jId", jobControllers.deleteJob);

router.post("/:jobId", jobControllers.saveJob);

router.post("/:jobId/apply", jobControllers.applyToJob);

module.exports = router;
