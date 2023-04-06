const { default: mongoose } = require("mongoose");
const express = require("express");
const Employer = require("../models/Employer");
const HttpError = require("../models/HttpError");

exports.signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    image,
    rating,
    salary,
    employees,
    jobs,
  } = req.body;

  let existingEmployer;
  try {
    existingEmployer = await Employer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find Employer", 500);
    return next(error);
  }

  if (existingEmployer) {
    const error = new HttpError("Employer already exist", 422);
    return next(error);
  }

  const createdEmployer = new Employer({
    name,
    email,
    password,
    phone,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680454460/2-removebg-preview_vggazr.png",
    rating,
    salary,
    employees,
    jobs,
  });

  let employer;
  try {
    employer = await createdEmployer.save();
  } catch (err) {
    const error = new HttpError("Could not create employer", 500);
    return next(error);
  }

  res.status(201).json({ createdEmployer: employer });
};

exports.login = async (req, res, next) => {};
