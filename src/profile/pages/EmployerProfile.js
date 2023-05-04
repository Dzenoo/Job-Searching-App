import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Info from "../components/Info";
import Jobs from "../components/Jobs";
import Applicians from "../components/Applicians";

const ProfilePage = () => {
  const employerData = JSON.parse(localStorage.getItem("employer"));
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container maxWidth="lg">
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
            flexWrap: "wrap",
          }}
        >
          <div className="profile_img">
            {employerData.em_name.substring(0, 2)}
          </div>
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
      <Box padding={2}>
        {currentTab === 0 && <Info biography={employerData.em_biography} />}
        {currentTab === 1 && <Jobs jobs={employerData.em_jobs} />}
        {currentTab === 2 && (
          <Applicians applicians={employerData.applications} />
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
