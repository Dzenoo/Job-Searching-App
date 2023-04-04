import { Box, Button, Card, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import ChooseAcc from "../components/ChooseAcc";
import Form from "../components/Form";
import logo from "../../shared/assets/logo.png";

const SignUp = () => {
  const [activeTab, setactiveTab] = useState(0);
  const [isSelectedAcc, setIsSelectedAcc] = useState("");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        marginTop: "7em",
      }}
    >
      <Box className="form_img">
        <div className="flex_buttons">
          <button className={`${activeTab === 0 ? "active" : ""}`}>1</button>
          <Typography color="#fff" fontWeight="bold">
            Choose type of account
          </Typography>
        </div>
        <div className="flex_buttons">
          <button className={`${activeTab === 1 ? "active" : ""}`}>2</button>
          <Typography color="#fff" fontWeight="bold">
            Enter your data
          </Typography>
        </div>
      </Box>
      <Card sx={{ padding: "40px", position: "relative" }}>
        <img src={logo} alt="logo" style={{ paddingBottom: "30px" }} />
        {activeTab === 0 ? (
          <ChooseAcc
            isSelected={isSelectedAcc}
            setSelectedAcc={setIsSelectedAcc}
          />
        ) : (
          <Form selectedAcc={isSelectedAcc} />
        )}
        {activeTab === 0 ? (
          <Button
            variant="contained"
            sx={{ position: "absolute", bottom: "20px", right: "20px" }}
            onClick={() => setactiveTab(1)}
            disabled={isSelectedAcc === ""}
          >
            Next
          </Button>
        ) : null}
      </Card>
    </Container>
  );
};

export default SignUp;
