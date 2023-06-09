import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { SlCursor } from "react-icons/sl";
import { AiOutlineSave } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const seekerData = JSON.parse(localStorage.getItem("seeker")) || "";

  return (
    <Container sx={{ padding: "12px" }}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dzwb60tk1/image/upload/v1678535834/Untitled_design_3_zbm2cx.png"
          }
          alt="profileimg"
          style={{ width: "160px", borderRadius: "60%" }}
        />
        <Box>
          <Typography variant="p">Its nice to see you here</Typography>
          <Typography variant="h4">
            {seekerData.first_name} {seekerData.last_name}
          </Typography>
          <Typography variant="p" color="gray">
            {seekerData.email}
          </Typography>
        </Box>
      </Card>
      <Grid container justifyContent="center" spacing={2} padding={6}>
        <Grid item>
          <Link className="link" to="applications">
            <Card sx={{ padding: "40px", cursor: "pointer" }}>
              <SlCursor fill="red" size={24} />
              <Typography variant="h5" color="royalblue">
                My applications
              </Typography>
              <Typography variant="p" color="textSecondary">
                View all jobs you applied to
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link className="link" to="saved-jobs">
            <Card sx={{ padding: "40px", cursor: "pointer" }}>
              <AiOutlineSave fill="green" size={24} />
              <Typography variant="h5" color="royalblue">
                Saved jobs
              </Typography>
              <Typography variant="p" color="textSecondary">
                View saved jobs that you like
              </Typography>
            </Card>
          </Link>
        </Grid>
        {/* <Grid item>
          <Link className="link" to="saved-companies">
            <Card sx={{ padding: '40px', cursor: 'pointer' }}>
              <GrUserWorker fill="blue" size={24} />
              <Typography variant="h5" color="royalblue">
                Followed companies
              </Typography>
              <Typography variant="p" color="textSecondary">
                View companies jobs that you followed
              </Typography>
            </Card>
          </Link>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
