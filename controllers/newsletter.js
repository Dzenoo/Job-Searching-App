const Newsletter = require("../models/Newsletter");

exports.signupForNewsletter = async (req, res, next) => {
  const { email } = req.body;

  const createdNewsletter = new Newsletter({
    email: email,
  });

  try {
    await createdNewsletter.save();
  } catch (err) {
    const error = new HttpError("Could not save newsletter");
    return next(error);
  }

  res.json({ message: "Newsletter saved" });
};
