const express = require("express");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const employerRoutes = require("./routes/employer-routes");
const seekerRoutes = require("./routes/seeker-routes");
const jobRoutes = require("./routes/job-routes");
const bodyParser = require("body-parser");
const applyRoutes = require("./routes/apply-routes");
const newsletter = require("./routes/newsletter");
const HttpError = require("./models/HttpError");
const cors = require("cors");
const path = require("path");

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "60mb" }));
app.use(
  "/uploads/documents",
  express.static(path.join("uploads", "documents"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/employer", employerRoutes);
app.use("/api/seeker", seekerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applyRoutes);
app.use("/api/newsletter", newsletter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error" });
});

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8suhkcc.mongodb.net/Job-Searching-Example?retryWrites=true&w=majority`;
mongoose
  .connect(URL)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err.message);
  });
