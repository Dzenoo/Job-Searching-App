import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";

const Applications = () => {
  const seeker = JSON.parse(localStorage.getItem("seeker"));

  return (
    <>
      <Container>
        <Card sx={{ padding: "60px" }}>
          <Typography variant="h4" fontWeight="bold" color="royalblue">
            Your Applications
          </Typography>
          <Typography variant="p">All jobs you applied</Typography>
        </Card>
      </Container>
      <Container
        sx={{
          padding: "30px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        {seeker.appliedJobs.map((apJobs) => (
          <Card sx={{ padding: "20px", maxWidth: "400px" }} key={apJobs._id}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {apJobs.title}
              </Typography>
              <Typography variant="p" color="textSecondary">
                {apJobs.schedule}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
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
                  <CiLocationOn size={24} />
                  {apJobs.city}
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
                  $ {apJobs.salary}
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
                  {apJobs.time}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Applications;
