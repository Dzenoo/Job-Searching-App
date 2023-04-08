import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { AiOutlineStar } from "react-icons/ai";

const SavedCompanies = () => {
  return (
    <>
      <Container>
        <Card sx={{ padding: "60px" }}>
          <Typography variant="h4" fontWeight="bold" color="royalblue">
            Saved companies
          </Typography>
          <Typography variant="p">
            Save companies which are good to you
          </Typography>
        </Card>
      </Container>
      <Container
        maxWidth="xs"
        sx={{ padding: "60px", display: "flex", flexDirection: "column" }}
      >
        <Card
          sx={{
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src="https://res.cloudinary.com/dzwb60tk1/image/upload/v1680454460/2-removebg-preview_vggazr.png"
            alt="logo"
            style={{ margin: "auto" }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Globex
            </Typography>
            <Typography>
              <b>4.2</b>
              <AiOutlineStar fill="gold" size={28} />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SavedCompanies;
