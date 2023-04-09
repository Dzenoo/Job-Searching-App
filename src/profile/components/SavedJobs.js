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
        maxWidth="xs"
        sx={{ padding: "60px", display: "flex", flexDirection: "column" }}
      >
        <Card sx={{ padding: "20px", maxWidth: "400px" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Typography variant="h5" fontWeight="bold">
              Web developer
            </Typography>
            <Typography variant="p" color="textSecondary">
              Company name
            </Typography>
            <Button variant="contained">
              <Link className="link">Apply </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Applications;
