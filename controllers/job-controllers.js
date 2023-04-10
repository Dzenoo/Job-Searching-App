const { default: mongoose } = require("mongoose");
const express = require("express");
const HttpError = require("../models/HttpError");
const Job = require("../models/Job");
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");

exports.newJob = async (req, res, next) => {
  const employerId = req.params.employerId;
  const {
    title,
    city,
    salary,
    time,
    level,
    skills,
    schedule,
    jobDescription,
    shortDescription,
    requirements,
  } = req.body;

  let createdJob = new Job({
    title,
    city,
    salary,
    time,
    level,
    skills,
    schedule,
    jobDescription,
    shortDescription,
    requirements,
    employer: employerId,
    applicians: [],
  });

  let employer;
  try {
    employer = await Employer.findById(employerId);
  } catch (err) {
    const error = new HttpError(
      "Could not find employer, please try again",
      500
    );
    return next(error);
  }

  if (!employer) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdJob.save({ session: sess });
    employer.em_jobs.push(createdJob);
    await employer.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    const error = new HttpError("Creating sess failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ job: createdJob });
};

exports.getJobs = async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find().populate("employer").select("-password");
  } catch (err) {
    const error = new HttpError("Cannot find jobs, please try again", 403);
    return next(error);
  }

  res
    .status(201)
    .json({ jobs: jobs.map((job) => job.toObject({ getters: true })) });
};

exports.getJob = async (req, res, next) => {
  const jobId = req.params.jobId;

  let job;
  try {
    job = await Job.findById(jobId).populate("employer");
  } catch (err) {
    const error = new HttpError("Cannot find job, please try again", 403);
    return next(error);
  }

  res.status(201).json({ job: job });
};

exports.saveJob = async (req, res, next) => {
  const { jobId, seekerId } = req.params;

  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    const error = new HttpError("Cannot find job, please try again", 403);
    return next(error);
  }

  let seeker;
  try {
    seeker = await Seeker.findById(seekerId);
  } catch (err) {
    const error = new HttpError("Cannot find seeker, please try again", 403);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    seeker.savedJobs.push(job);
    await seeker.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    const error = new HttpError("Could not save job, please try again", 403);
    return next(error);
  }

  res.status(201).json({ message: "Saved job successfully" });
};

exports.deleteJob = async (req, res, next) => {};
