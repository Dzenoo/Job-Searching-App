import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Typography,
} from "@mui/material";
import React from "react";
import Input from "../../shared/components/Input";
import { useFormHook } from "../../shared/hooks/useForm";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";
import { useParams, useRouteLoaderData } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Upload from "../../shared/components/Upload";

const ApplyJob = () => {
  const [formState, inputHandler] = useFormHook(
    {
      name: {
        value: "",
        isValid: false,
      },
      surname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      github: {
        value: "",
        isValid: false,
      },
      linkedin: {
        value: "",
        isValid: false,
      },
      // cv: {
      //   value: "",
      //   isValid: false,
      // },
    },
    false
  );
  const jobId = useParams().idOfJob;
  const seeker = JSON.parse(localStorage.getItem("seeker"));
  const data = useRouteLoaderData("job-details");
  const job = data.job;

  async function applyHandler(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("surname", formState.inputs.surname.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("phone", formState.inputs.phone.value);
      formData.append("github", formState.inputs.github.value);
      formData.append("linkedin", formState.inputs.linkedin.value);
      // formData.append("cv", formState.inputs.cv.value);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/applications/${jobId}/${seeker.id}/${job.employer._id}/apply`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        toast.success("Successfully applied to job");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container maxWidth="md" sx={{ padding: "30px" }}>
      <ToastContainer />
      <Card>
        <Box sx={{ backgroundColor: "hsl(209, 84%, 49%)", height: "130px" }}>
          <div style={{ padding: "20px" }}>
            <Typography variant="h4" color="#fff" fontWeight="bold">
              {job.title}
            </Typography>
            <Typography variant="h6" color="#fff">
              {job.employer.em_name}
            </Typography>
          </div>
        </Box>
        <form onSubmit={applyHandler} style={{ position: "relative" }}>
          <div style={{}} className="apply_form">
            <FormControl>
              <label htmlFor="name">Name</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(3)]}
                placeholder="Name"
                id="name"
                type="text"
                errorText="Please enter valid name"
                initialValue={seeker.first_name}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="surname">Surname</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(3)]}
                placeholder="Surname"
                id="surname"
                type="text"
                errorText="Please enter valid surname"
                initialValue={seeker.last_name}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="email">Email</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                placeholder="Email"
                id="email"
                type="email"
                errorText="Please enter valid email"
                initialValue={seeker.email}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="phone">Phone</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(3)]}
                placeholder="Phone"
                id="phone"
                type="number"
                errorText="Please enter valid phone"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="github">Github</label>
              <Input
                type="url"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                placeholder="Github url"
                id="github"
                errorText="Please enter valid github"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="linkedin">Linkedin</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                placeholder="Linkedin"
                id="linkedin"
                type="url"
                errorText="Please enter valid linkedin"
              />
            </FormControl>
            {/* <FormControl>
              <Upload
                onInput={inputHandler}
                id="cv"
                errorText="Please enter valid cv"
              />
            </FormControl> */}
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{ position: "absolute", right: "20px", bottom: "10px" }}
          >
            Apply
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ApplyJob;
