import {
  Alert,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { jobtypes, locations, Seniority } from "../../shared/data/data";
import React, { useContext } from "react";
import Input from "../../shared/components/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/Validators";
import { useFormHook } from "../../shared/hooks/useForm";
import { useState } from "react";
import { AuthContext } from "../../shared/context/AuthContext";

const NewJob = () => {
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      salary: {
        value: "",
        isValid: false,
      },
      skills: {
        value: "",
        isValid: false,
      },
      jobDescription: {
        value: "",
        isValid: false,
      },
      shortDescription: {
        value: "",
        isValid: false,
      },
      requirements: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { userId } = useContext(AuthContext);

  const handleTypeChange = (event, type) => {
    const selectedType = event.target.value;
    inputHandler(type, selectedType, true);
  };

  const postJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/jobs/${userId}/new`,
        {
          method: "POST",
          body: JSON.stringify({
            title: formState.inputs.title.value,
            city: formState.inputs.city.value,
            salary: formState.inputs.salary.value,
            time: formState.inputs.time.value,
            level: formState.inputs.level.value,
            skills: formState.inputs.skills.value,
            schedule: formState.inputs.schedule.value,
            jobDescription: formState.inputs.jobDescription.value,
            shortDescription: formState.inputs.shortDescription.value,
            requirements: formState.inputs.requirements.value,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Not ok response");
      }
    } catch (error) {}
  };

  return (
    <Container maxWidth="md" sx={{ padding: "60px", backgroundColor: "#fff" }}>
      <Card>
        <form
          onSubmit={postJob}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            gap: "3em",
          }}
        >
          {/* Job Title */}
          <FormControl>
            <label htmlFor="">Job Title</label>
            <Typography color="textSecondary">
              Job titles must describe position
            </Typography>
            <Input
              placeholder="Job Title"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job title"
              id="title"
              onInput={inputHandler}
            />
          </FormControl>

          {/* City */}
          <FormControl>
            <label htmlFor="">City</label>
            <Typography color="textSecondary">
              Enter city where is your position
            </Typography>
            <Input
              placeholder="e.g, London.."
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid city"
              id="city"
              onInput={inputHandler}
            />
          </FormControl>

          {/* Salary */}
          <FormControl>
            <label htmlFor="">Salary</label>
            <Typography color="textSecondary">
              Enter estimated salary for that job
            </Typography>
            <Input
              placeholder="e.g, 2000"
              validators={[VALIDATOR_REQUIRE()]}
              type="number"
              errorText="Please enter valid job salary"
              id="salary"
              onInput={inputHandler}
            />
          </FormControl>

          {/* Time */}
          <FormControl>
            <label htmlFor="">Job type</label>
            <Typography color="textSecondary">
              You can select multiple job types
            </Typography>
            <RadioGroup onChange={(e) => handleTypeChange(e, "time")}>
              {jobtypes.map((type) => (
                <FormControlLabel
                  value={type.label}
                  label={type.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Seniority */}
          <FormControl>
            <label htmlFor="">Seniority</label>
            <Typography color="textSecondary">
              Enter estimated Seniority for that job
            </Typography>
            <RadioGroup onChange={(e) => handleTypeChange(e, "level")}>
              {Seniority.map((s) => (
                <FormControlLabel
                  value={s.label}
                  label={s.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Skills */}
          <Alert severity="info">
            Please separate your skills with commas (e.g. React, Node.js, HTML,
            CSS). Thank you!
          </Alert>
          <FormControl>
            <label htmlFor="">Skills</label>
            <Typography color="textSecondary">Add Skills</Typography>
            <TextField
              type="text"
              id="skills"
              name="skills"
              onChange={(event) =>
                inputHandler("skills", event.target.value, true)
              }
            />
          </FormControl>

          {/* Schedule */}
          <FormControl>
            <label htmlFor="">Job Location work</label>
            <Typography color="textSecondary">
              Job titles must describe location work
            </Typography>
            <RadioGroup onChange={(e) => handleTypeChange(e, "schedule")}>
              {locations.map((l) => (
                <FormControlLabel
                  value={l.label}
                  label={l.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Job Description */}
          <FormControl>
            <label htmlFor="">Job Description </label>
            <Typography color="textSecondary">Add Description</Typography>
            <Input
              element="textarea"
              placeholder="e.g,"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job description"
              id="jobDescription"
              onInput={inputHandler}
            />
          </FormControl>

          {/* Job short description */}
          <FormControl>
            <label htmlFor="">Job short description</label>
            <Typography color="textSecondary">
              Short description about job
            </Typography>
            <Input
              element="textarea"
              placeholder="Job Short Description"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid short description"
              id="shortDescription"
              onInput={inputHandler}
            />
          </FormControl>

          <Alert severity="info">
            When typing requirements and job description use enter after every
            step
          </Alert>
          {/* Requirements */}
          <FormControl>
            <label htmlFor="">Requirements</label>
            <Typography color="textSecondary">
              Add multiple requirements
            </Typography>
            <Input
              element="textarea"
              placeholder="e.g,"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job requirements"
              id="requirements"
              onInput={inputHandler}
            />
          </FormControl>

          <Button variant="contained" type="submit">
            Post
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default NewJob;
