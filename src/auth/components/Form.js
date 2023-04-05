import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  Typography,
} from "@mui/material";
import React from "react";
import Input from "../../shared/components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";

const Form = ({ onChange, isSignupMode }) => {
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
          {isSignupMode === "Employer Account" && (
            <FormControl>
              <Input
                placeholder="First Name..."
                onInput={onChange}
                id="first_name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid first name"
              />
            </FormControl>
          )}

          {isSignupMode === "Employer Account" && (
            <FormControl>
              <Input
                placeholder="Last Name..."
                onInput={onChange}
                id="last_name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid last_name"
              />
            </FormControl>
          )}

          {isSignupMode === "Employer Account" && (
            <FormControl>
              <Input
                placeholder="Email Address..."
                onInput={onChange}
                id="email"
                type="email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email"
              />
            </FormControl>
          )}

          {isSignupMode === "Employer Account" && (
            <FormControl>
              <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              />
            </FormControl>
          )}

          {/*  */}
          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
         
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}{" "}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
          )}

          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
          )}

          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
          )}

          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
          )}

          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
          )}

          {isSignupMode === "Seeker Account" && (
            <FormControl>
              {/* <Input
                placeholder="Password..."
                onInput={onChange}
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password"
              /> */}
              <h1>INPUT SEEKEER</h1>
            </FormControl>
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
