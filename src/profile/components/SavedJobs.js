import React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Applications = () => {
  const seeker = JSON.parse(localStorage.getItem("seeker"));

  return (
    <>
      <Container>
        <Card sx={{ padding: "60px" }}>
          <Typography variant="h4" fontWeight="bold" color="royalblue">
            Saved jobs
          </Typography>
          <Typography variant="p">
            Save jobs which are good to you, apply after
          </Typography>
        </Card>
      </Container>
      <Container
        sx={{
          padding: "60px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        {seeker.savedJobs.map((svJobs) => (
          <Card sx={{ padding: "20px", maxWidth: "400px" }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Typography variant="h5" fontWeight="bold">
                {svJobs.title}
              </Typography>
              <Typography variant="p" color="textSecondary">
                {svJobs.schedule}
              </Typography>
              <Button variant="contained">
                <Link className="link" to={`/jobs/${svJobs._id}`}>
                  Apply
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Applications;
