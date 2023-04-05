import {
  Alert,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { jobtypes, locations, Seniority } from "../../shared/data/data";
import React from "react";
import Input from "../../shared/components/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/Validators";
import { useFormHook } from "../../shared/hooks/useForm";

const NewJob = () => {
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      job_title: {
        value: "",
        isValid: false,
      },
      job_shortDesc: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      seniority: {
        value: "",
        isValid: false,
      },
      location_work: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      salary: {
        value: "",
        isValid: false,
      },
      requirements: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleTypeChange = (event, type) => {
    const selectedType = event.target.value;
    inputHandler(type, selectedType, true);
  };

  return (
    <Container maxWidth="md" sx={{ padding: "60px", backgroundColor: "#fff" }}>
      <Card>
        <form
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
              id="job_title"
              onInput={inputHandler}
            />
          </FormControl>

          {/* Job short description */}
          <FormControl>
            <label htmlFor="">Job description</label>
            <Typography color="textSecondary">
              Short description about job
            </Typography>
            <Input
              element="textarea"
              placeholder="Job Short Description"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid short description"
              id="job_shortDesc"
              onInput={inputHandler}
            />
          </FormControl>

          {/* Job type */}
          <FormControl>
            <label htmlFor="">Job type</label>
            <Typography color="textSecondary">
              You can select multiple job types
            </Typography>
            <RadioGroup onChange={(e) => handleTypeChange(e, "type")}>
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
            <RadioGroup onChange={(e) => handleTypeChange(e, "seniority")}>
              {Seniority.map((s) => (
                <FormControlLabel
                  value={s.label}
                  label={s.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Location */}
          <FormControl>
            <label htmlFor="">Location</label>
            <Typography color="textSecondary">
              Enter location where is your position
            </Typography>
            <Input
              placeholder="e.g, London.."
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job location"
              id="location"
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

          {/* Job Location */}
          <FormControl>
            <label htmlFor="">Job Location work</label>
            <Typography color="textSecondary">
              Job titles must describe location work
            </Typography>
            <RadioGroup onChange={(e) => handleTypeChange(e, "location_work")}>
              {locations.map((l) => (
                <FormControlLabel
                  value={l.label}
                  label={l.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
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
              id="description"
              onInput={inputHandler}
            />
          </FormControl>
          <Button variant="contained">Post</Button>
        </form>
      </Card>
    </Container>
  );
};

export default NewJob;
