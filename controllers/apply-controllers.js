const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const Seeker = require("../models/Seeker");
const Job = require("../models/Job");
const HttpError = require("../models/HttpError");
const Employer = require("../models/Employer");
const { validationResult } = require("express-validator");

exports.applyToJob = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { seekerId, employerId, jobId } = req.params;
  const { name, surname, email, phone, github, linkedin } = req.body;

  let seeker;
  try {
    seeker = await Seeker.findById(seekerId);
  } catch (err) {
    const error = new HttpError("Could not find Seeker");
    return next(error);
  }

  if (!seeker) {
    const error = new HttpError("Seeker doesnt exist");
    return next(error);
  }

  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    const error = new HttpError("Could not find Job");
    return next(error);
  }

  let employer;
  try {
    employer = await Employer.findById(employerId);
  } catch (err) {
    const error = new HttpError("Could not find Employer");
    return next(error);
  }

  const createdApplication = new Application({
    name,
    surname,
    email,
    phone,
    github,
    linkedin,
    employer: employerId,
    cv: req.file.path,
    job: jobId,
  });

  if (seeker.appliedJobs.includes(jobId)) {
    const error = new HttpError("You already applied for this job", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdApplication.save({ session: sess });
    seeker.appliedJobs.push(jobId);
    await seeker.save({ session: sess });
    job.applicians.push(seekerId);
    await job.save({ session: sess });
    employer.applications.push(createdApplication);
    await employer.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    const error = new HttpError("Could not apply to job");
    return next(error);
  }

  res.status(201).json({ createdApplication: createdApplication });
};

exports.updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const applicationId = req.params.applicationId;

  let application;
  try {
    application = await Application.findByIdAndUpdate(applicationId, {
      status,
    });
  } catch (err) {
    const error = new HttpError("Could not update status");
    return next(error);
  }

  res.status(200).json({ message: "Status updated" });
};
