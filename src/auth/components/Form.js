import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Form = () => {
  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
      <Typography variant="p">
        Have Account? <a>Login</a>
      </Typography>
      <CardContent>
        <form className="auth_form">
          <FormControl>
            <TextField placeholder="Email..." />
          </FormControl>

          <FormControl>
            <TextField placeholder="Password..." />
          </FormControl>

          <FormControl>
            <TextField placeholder="Company Name..." />
          </FormControl>

          <Button type="submit" variant="contained" size="large">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Typography>
          By signing up for our job searching app, you agree to our Terms of
          Service and Privacy Policy. Please review these documents carefully
          before proceeding.
        </Typography>
      </CardActions>
    </>
  );
};

export default Form;
