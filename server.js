const express = require("express");
const { default: mongoose } = require("mongoose");
const employerRoutes = require("./routes/employer-routes");
const seekerRoutes = require("./routes/seeker-routes");
const jobRoutes = require("./routes/job-routes");
const bodyParser = require("body-parser");
const HttpError = require("./models/HttpError");
const cors = require("cors");

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
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
