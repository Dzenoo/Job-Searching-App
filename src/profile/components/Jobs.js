import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const Jobs = ({ jobs }) => {
  return (
    <>
      <Container>
        {jobs.map((job) => (
          <Card sx={{ padding: "20px", maxWidth: "400px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            ></Box>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {job.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color="purple"
                  sx={{
                    backgroundColor: "rgba(205, 9, 195, 0.148)",
                    padding: "8px 20px",
                    borderRadius: "20px",
                  }}
                >
                  {job.level}
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color="green"
                  sx={{
                    backgroundColor: "rgba(23, 240, 81, 0.148)",
                    padding: "8px 20px",
                    borderRadius: "20px",
                  }}
                >
                  ${job.salary}
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color="rgb(9, 43, 153)"
                  sx={{
                    backgroundColor: "rgba(25, 74, 236, 0.148)",
                    padding: "8px 20px",
                    borderRadius: "20px",
                  }}
                >
                  {job.time}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Typography variant="p" fontWeight="bold">
                  <CiLocationOn size={24} /> {job.city}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ wordBreak: "break-word" }}
                >
                  {job.shortDescription.substring(0, 60)}...
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Link
                to={`/jobs/${job._id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Button variant="contained" size="large" fullWidth>
                  View Job
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Jobs;
