const { default: mongoose } = require("mongoose");
const express = require("express");
const Seeker = require("../models/Seeker");
const HttpError = require("../models/HttpError");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  let existingSeeker;
  try {
    existingSeeker = await Seeker.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find Seeker", 500);
    return next(error);
  }

  if (existingSeeker) {
    const error = new HttpError("Seeker already exist", 422);
    return next(error);
  }

  const createdSeeker = new Seeker({
    first_name,
    last_name,
    email,
    password,
    appliedJobs: [],
    savedJobs: [],
  });

  let seeker;
  try {
    seeker = await createdSeeker.save();
  } catch (err) {
    const error = new HttpError("Could not create seeker", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        seekerId: createdSeeker.id,
        se_email: createdSeeker.email,
      },
      "strongsecret",
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    seekerId: createdSeeker.id,
    se_email: createdSeeker.email,
    token: token,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Seeker.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find seeker for that email", 404);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Could not find seeker", 403);
    return next(error);
  }

  if (existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        seekerId: existingUser.id,
        se_email: existingUser.email,
      },
      "strongsecret",
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    seekerId: existingUser.id,
    se_email: existingUser.email,
    token: token,
  });
};

exports.getProfile = async (req, res, next) => {
  const seekerId = req.params.seekerId;

  let seeker;
  try {
    seeker = await Seeker.findById(seekerId)
      .populate("savedJobs")
      .populate({
        path: "appliedJobs",
        populate: {
          path: "job",
        },
      });
  } catch (err) {
    const error = new HttpError("Cannot get user profile", 403);
    return next(error);
  }

  res.status(200).json({ seeker: seeker.toObject({ getters: true }) });
};
