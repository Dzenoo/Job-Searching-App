const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const Seeker = require("../models/Seeker");
const Job = require("../models/Job");
const HttpError = require("../models/HttpError");

exports.applyToJob = async (req, res, next) => {
  const { seekerId, jobId } = req.params;
  const { name, surname, email, phone, cv, country } = req.body;

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

  const createdApplication = new Application({
    name,
    surname,
    email,
    phone,
    cv,
    country,
    job: jobId,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdApplication.save({ session: sess });
    seeker.appliedJobs.push(createdApplication);
    await seeker.save({ session: sess });
    job.applicians.push(seekerId);
    await job.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    const error = new HttpError("Could not save application");
    return next(error);
  }

  res.status(201).json({ createdApplication: createdApplication });
};
