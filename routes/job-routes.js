const express = require("express");
const jobControllers = require("../controllers/job-controllers");

const router = express.Router();

router.post("/:employerId/new", jobControllers.newJob);

router.get("/", jobControllers.getJobs);

router.get("/:jobId", jobControllers.getJob);

router.delete("/:jId", jobControllers.deleteJob);

router.post("/:seekerId/:jobId/save", jobControllers.saveJob);

module.exports = router;
