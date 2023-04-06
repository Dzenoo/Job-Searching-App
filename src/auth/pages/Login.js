import React, { useState } from "react";
import logo from "../../shared/assets/logo.png";
import {
  Button,
  Card,
  Container,
  FormControl,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormHook } from "../../shared/hooks/useForm";
import Input from "../../shared/components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";

const Login = () => {
  const [isType, setisType] = useState(false);
  const [formState, inputHandler] = useFormHook(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchAccTypeLogin = () => {
    setisType(!isType);
  };

  return (
    <Container maxWidth="xs">
      <img src={logo} alt="logo" />
      <Card
        sx={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "60px",
        }}
      >
        <Typography variant="h4">
          Login as {isType ? "Seeker" : "Employer"}
        </Typography>
        <Typography variant="p">
          Dont have account?{" "}
          <Link to="/auth/signup" className="link">
            Register
          </Link>
        </Typography>
        <form className="login_form">
          <FormControl>
            <label>Email</label>
            <Input
              placeholder="email"
              onInput={inputHandler}
              validators={[VALIDATOR_EMAIL()]}
              type="email"
              id="email"
              errorText="Please enter valid email"
            />
          </FormControl>
          <FormControl>
            <label>Password</label>
            <Input
              placeholder="password"
              onInput={inputHandler}
              validators={[VALIDATOR_MINLENGTH(6)]}
              type="password"
              id="email"
              errorText="Please enter valid password"
            />
          </FormControl>
          <Button variant="contained">Login</Button>
        </form>
        <Button variant="outlined" onClick={switchAccTypeLogin}>
          Login as {isType ? "Employer" : "Seeker"}
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
