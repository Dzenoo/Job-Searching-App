import React from "react";
import logo from "../../shared/assets/logo.png";
import {
  Button,
  Card,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container maxWidth="xs">
      <img src={logo} alt="logo" />
      <Card
        sx={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Typography variant="p">
          Dont have account?{" "}
          <Link to="/auth/signup" className="link">
            Register
          </Link>
        </Typography>
        <form className="login_form">
          <FormControl>
            <TextField placeholder="email" />
          </FormControl>
          <FormControl>
            <TextField placeholder="password" />
          </FormControl>
          <Button variant="contained">Login</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
