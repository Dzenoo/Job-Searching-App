import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Form = ({ selectedAcc }) => {
  return (
    <>
      <Typography variant="h4" color="darkblue">
        Sign Up
      </Typography>
      <Typography variant="p">
        Have Account? <a>Login</a>
      </Typography>
      <CardContent>
        <form className="auth_form">
          {selectedAcc === "Seeker Account" && (
            <>
              <FormControl>
                <TextField placeholder="First Name..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Last Name..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Email Address..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Password..." />
              </FormControl>
            </>
          )}

          {selectedAcc === "Employer Account" && (
            <>
              <FormControl>
                <TextField placeholder="Company Name..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Location..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Email..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Salary range..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Job title..." />
              </FormControl>
              <FormControl>
                <TextField placeholder="Password..." />
              </FormControl>
            </>
          )}

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
