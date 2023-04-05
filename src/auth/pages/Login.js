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
import { useFormHook } from "../../shared/hooks/useForm";
import Input from "../../shared/components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";

const Login = () => {
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
      </Card>
    </Container>
  );
};

export default Login;
