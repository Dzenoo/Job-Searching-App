const express = require("express");
const jobControllers = require("../controllers/job-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/:employerId/new",
  [
    check("title").not().isEmpty(),
    check("city").not().isEmpty(),
    check("salary").not().isEmpty(),
    check("time").not().isEmpty(),
    check("level").not().isEmpty(),
    check("skills").not().isEmpty(),
    check("schedule").not().isEmpty(),
    check("jobDescription").not().isEmpty(),
    check("shortDescription").not().isEmpty(),
    check("requirements").not().isEmpty(),
  ],
  jobControllers.newJob
);

router.get("/", jobControllers.getJobs);

router.get("/:jobId", jobControllers.getJob);

router.delete("/:employerId/:jobId/delete", jobControllers.deleteJob);

router.post("/:seekerId/:jobId/save", jobControllers.saveJob);

module.exports = router;
