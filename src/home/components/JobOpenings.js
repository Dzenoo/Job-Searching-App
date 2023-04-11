import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { AiOutlineDollarCircle, AiOutlineFieldTime } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import newsletter from "../../shared/assets/signup_action.png";
import React from "react";
import { Link } from "react-router-dom";

const JobOpenings = ({ jobs }) => {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "60px" }}>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span className="button_outlined">Job openings</span>
        <Typography variant="h2" color="textPrimary" fontWeight="bold">
          Browse jobs
        </Typography>
        <Typography variant="p" color="textSecondary">
          More Opportunities: By browsing job opportunities on a job
          <br />
          searching app, you can access a wider range of job listings than
          <br />
          you might find through other channels.
        </Typography>
      </Box>

      <Grid container justifyContent="center" padding={6} spacing={4}>
        {jobs.map((job) => (
          <Grid item key={job.id}>
            <Card
              sx={{
                border: "1px solid #1482e8",
                borderRadius: "60px",
                padding: "20px",
                maxWidth: "500px",
              }}
            >
              <CardContent>
                <img
                  src={job.employer.em_image}
                  alt={job.title}
                  style={{
                    width: "100px",
                  }}
                />
                <Typography variant="h4" color="#1482e8">
                  {job.title}
                </Typography>
                <Typography variant="h6">
                  <Link
                    to={`/companies/${job.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {job.employer.em_name}
                  </Link>
                </Typography>
                <hr />
                <Typography variant="p" color="textSecondary">
                  {job.shortDescription.substring(0, 30)}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
              >
                <Typography
                  variant="p"
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <CiLocationOn size={30} fill="blue" />
                  {job.city}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <AiOutlineDollarCircle size={30} fill="green" />
                  {job.salary}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <AiOutlineFieldTime size={30} fill="red" />
                  {job.time}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", padding: "0px" }}>
        <div className="signup_action">
          <img src={newsletter} alt="newsletter" />
          <div className="text">
            <Typography variant="h4" color="white">
              Set up personalized job alerts
            </Typography>

            <Link to="/auth/signup" className="link">
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  padding: "20px 60px",
                  backgroundColor: "#fff",
                  color: "#121212",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default JobOpenings;
