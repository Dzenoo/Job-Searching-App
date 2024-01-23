const { default: mongoose } = require("mongoose");
const express = require("express");
const Seeker = require("../models/Seeker");
const HttpError = require("../models/HttpError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
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

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not hash password, try again later",
      500
    );
    return next(error);
  }

  const createdSeeker = new Seeker({
    first_name,
    last_name,
    email,
    password: hashPassword,
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
      process.env.JWT,
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
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

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in please check credentials.",
      500
    );
    return next(error);
  }

  if (!isPasswordValid) {
    const error = new HttpError(
      "Could not log you in please check credentials.",
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
      process.env.JWT,
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
      .populate("appliedJobs")
      .populate("savedJobs");
  } catch (err) {
    const error = new HttpError("Cannot get user profile", 403);
    return next(error);
  }

  res.status(200).json({ seeker: seeker.toObject({ getters: true }) });
};
