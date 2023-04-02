import { Box, Container, Grid, Typography } from "@mui/material";
import icon_employers from "../../shared/assets/icon_employers.png";
import icon_search from "../../shared/assets/icon_search.png";
import icon_recommedations from "../../shared/assets/icon_recommedations.png";
import React from "react";

const WhyJobSections = () => {
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
        <span className="button_outlined">Why jobboost</span>
        <Typography variant="h2" color="textPrimary" fontWeight="bold">
          New way to get a Job
        </Typography>
        <Typography variant="p" color="textSecondary">
          Discover job opportunities from top companies in your field.
          <br /> Our user-friendly platform features powerful search tools to
          <br />
          help you find the perfect job with ease.
        </Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4} padding={10}>
        <Grid item lg={4}>
          <Box className="why_job_box">
            <img src={icon_employers} alt="employers icon" />
            <Typography variant="h4" color="textPrimary" fontWeight="bold">
              Top Employers
            </Typography>
            <Typography variant="p" color="textSecondary">
              Our app features a card that showcases job opportunities from the
              best companies in your field.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box className="why_job_box">
            <img src={icon_search} alt="search icon" />
            <Typography variant="h4" color="textPrimary" fontWeight="bold">
              Custom Search
            </Typography>
            <Typography variant="p" color="textSecondary">
              Easily filter job results by location, salary, and other important
              factors with our custom search card.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box className="why_job_box">
            <img src={icon_recommedations} alt="recommedations icon" />
            <Typography variant="h4" color="textPrimary" fontWeight="bold">
              Recommendations
            </Typography>
            <Typography variant="p" color="grey">
              Discover job openings tailored to your skills and experience with
              our recommendation card.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhyJobSections;
