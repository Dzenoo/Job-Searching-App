import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Applications = () => {
  return (
    <>
      <Container>
        <Card sx={{ padding: "60px" }}>
          <Typography variant="h4" fontWeight="bold" color="royalblue">
            Your Applications
          </Typography>
          <Typography variant="p">All Applications you apply</Typography>
        </Card>
      </Container>

      <Container
        maxWidth="xs"
        sx={{ padding: "60px", display: "flex", flexDirection: "column" }}
      >
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
              Web developer
            </Typography>
            <Typography variant="p" color="textSecondary">
              Company name
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
                Junior
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
                $2000
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
                Full-Time
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
                <CiLocationOn size={24} /> New York
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Applications;
