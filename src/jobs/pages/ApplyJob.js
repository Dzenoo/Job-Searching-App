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
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
      cv: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const jobId = useParams().idOfJob;
  const seeker = JSON.parse(localStorage.getItem("seeker"));

  async function applyHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/applications/${jobId}/${seeker.id}/apply`,
        {
          method: "POST",
          body: JSON.stringify({
            name: formState.inputs.name.value,
            surname: formState.inputs.surname.value,
            phone: formState.inputs.phone.value,
            email: formState.inputs.email.value,
            cv: formState.inputs.cv.value,
            country: formState.inputs.country.value,
          }),
          headers: { "Content-Type": "application/json" },
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
              Web developer
            </Typography>
            <Typography variant="h6" color="#fff">
              COmpany INC
            </Typography>
          </div>
        </Box>
        <form onSubmit={applyHandler} style={{ position: "relative" }}>
          <div
            style={{
              padding: "70px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
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
                type="text"
                errorText="Please enter valid phone"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="cv">CV</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                placeholder="CV"
                id="cv"
                type="text"
                errorText="Please enter valid cv"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="country">Country</label>
              <Input
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(3)]}
                placeholder="Country"
                id="country"
                type="text"
                errorText="Please enter valid country"
              />
            </FormControl>
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
