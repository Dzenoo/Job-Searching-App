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
import React, { useContext, useState } from "react";
import Input from "../../shared/components/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/Validators";
import { useFormHook } from "../../shared/hooks/useForm";
import { AuthContext } from "../../shared/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const NewJob = () => {
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [formState, inputHandler] = useFormHook(
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
    setisLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/${userId}/new`,
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
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      seterror(err.message);
    }
  };

  if (error) {
    toast.error(error);
  }

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: "20px", backgroundColor: "#fff" }}>
      <ToastContainer />
      <Card>
        <form onSubmit={postJob} style={{}} className="add_job_form">
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

          <Alert severity="info">Enter New York, London, or Berlin</Alert>
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

          <Alert severity="info">Enter between 0 - 100 000</Alert>

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
                  key={type.label}
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
                  key={s.label}
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
                  key={l.label}
                  value={l.label}
                  label={l.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Alert severity="info">
            When typing job description and job description use enter after
            every step
          </Alert>

          {/* Job Description */}
          <FormControl>
            <label htmlFor="">Job Description </label>
            <Typography color="textSecondary">Add Description</Typography>
            <Input
              element="textarea"
              placeholder="e.g, step\n step\n"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job description"
              id="jobDescription"
              className="textArea"
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
              className="textArea"
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
              placeholder="e.g, step\n step\n"
              validators={[VALIDATOR_REQUIRE()]}
              type="text"
              errorText="Please enter valid job requirements"
              className="textArea"
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
