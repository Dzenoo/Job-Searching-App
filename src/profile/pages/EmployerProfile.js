import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Info from "../components/Info";
import Jobs from "../components/Jobs";
import Applicians from "../components/Applicians";

const ProfilePage = () => {
  const employerData = JSON.parse(localStorage.getItem("employer"));
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container sx={{ padding: "60px" }} maxWidth="md">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          <img
            src={employerData.em_image}
            alt="profileimg"
            style={{ width: "160px", borderRadius: "60%" }}
          />
          <Box>
            <Typography variant="p">Its nice to see you here</Typography>
            <Typography variant="h4">{employerData.em_name}</Typography>
            <Typography variant="p" color="gray">
              {employerData.em_email}
            </Typography>
          </Box>
        </Box>
        <div>
          <Button
            variant={`${currentTab === 0 && "contained"}`}
            onClick={() => setCurrentTab(0)}
          >
            Info
          </Button>
          <Button
            variant={`${currentTab === 1 && "contained"}`}
            onClick={() => setCurrentTab(1)}
          >
            Jobs
          </Button>
          <Button
            variant={`${currentTab === 2 && "contained"}`}
            onClick={() => setCurrentTab(2)}
          >
            Applicians
          </Button>
        </div>
      </Card>
      <Grid container justifyContent="center" spacing={2} padding={6}>
        {currentTab === 0 && (
          <Grid item>
            <Info biography={employerData.em_biography} />
          </Grid>
        )}

        {currentTab === 1 && (
          <Grid item lg={9}>
            <Jobs jobs={employerData.em_jobs} />
          </Grid>
        )}

        {currentTab === 2 && (
          <Grid item lg={12}>
            <Applicians applicians={employerData.applications} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
