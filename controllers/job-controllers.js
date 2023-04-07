const { default: mongoose } = require("mongoose");
const express = require("express");
const HttpError = require("../models/HttpError");
const Job = require("../models/Job");

exports.newJob = async (req, res, next) => {
  const {
    title,
    city,
    salary,
    company,
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
    company,
    time,
    level,
    skills,
    schedule,
    jobDescription,
    shortDescription,
    requirements,
  });

  let job;
  try {
    job = await createdJob.save();
  } catch (err) {
    const error = new HttpError("Cannot create job, please try again", 500);
    return next(error);
  }

  res.status(201).json({ job: job.toObject({ getters: true }) });
};

exports.getJobs = async (req, res, next) => {};

exports.getJob = async (req, res, next) => {};

exports.applyToJob = async (req, res, next) => {};

exports.saveJob = async (req, res, next) => {};

exports.deleteJob = async (req, res, next) => {};
