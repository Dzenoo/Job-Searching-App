const { default: mongoose } = require("mongoose");
const express = require("express");
const Seeker = require("../models/Seeker");
const HttpError = require("../models/HttpError");

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
  });

  let seeker;
  try {
    seeker = await createdSeeker.save();
  } catch (err) {
    const error = new HttpError("Could not create seeker", 500);
    return next(error);
  }

  res.status(201).json({ createdSeeker: seeker });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Seeker.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find seeker", 404);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Could not find seeke", 403);
    return next(error);
  }

  if (existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  res.status(200).json({ message: "Logged In" });
};
