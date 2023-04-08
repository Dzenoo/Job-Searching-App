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

const Form = ({ onChange, isSignupMode, onSubmitForm }) => {
  return (
    <>
      <Typography variant="h4" color="darkblue">
        Sign Up
      </Typography>
      <Typography variant="p">
        Have Account? <a>Login</a>
      </Typography>
      <CardContent>
        <form className="auth_form" onSubmit={onSubmitForm}>
          {isSignupMode === "Seeker Account" && (
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
          {isSignupMode === "Seeker Account" && (
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
          {isSignupMode === "Seeker Account" && (
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
          {isSignupMode === "Seeker Account" && (
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
          {/* EMPLOYER  */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Employer Name..."
                  onInput={onChange}
                  id="em_name"
                  type="text"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid employer name"
                />
              </FormControl>
            )}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Employer Email..."
                  onInput={onChange}
                  id="em_email"
                  type="email"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid employer email"
                />
              </FormControl>
            )}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Employer Password..."
                  onInput={onChange}
                  id="em_password"
                  type="password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please enter a valid employer password"
                />
              </FormControl>
            )}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Phone..."
                  onInput={onChange}
                  id="em_phone"
                  type="number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid phone"
                />
              </FormControl>
            )}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Salary..."
                  onInput={onChange}
                  id="em_salary"
                  type="number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid salary"
                />
              </FormControl>
            )}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  placeholder="Employees..."
                  onInput={onChange}
                  id="em_employees"
                  type="number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid employees"
                />
              </FormControl>
            )}{" "}
            {isSignupMode === "Employer Account" && (
              <FormControl>
                <Input
                  className="bio_textarea"
                  element="textarea"
                  placeholder="Biography..."
                  onInput={onChange}
                  id="em_biography"
                  type="text"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid biography"
                />
              </FormControl>
            )}{" "}
          </div>
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
