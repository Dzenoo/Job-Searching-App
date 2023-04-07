import React, { useEffect, useState } from "react";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useFormHook } from "../../shared/hooks/useForm";
import ChooseAcc from "../components/ChooseAcc";
import Form from "../components/Form";
import logo from "../../shared/assets/logo.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [activeTab, setactiveTab] = useState(0);
  const [isSelectedAcc, setIsSelectedAcc] = useState("");
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      first_name: {
        value: "",
        isValid: false,
      },
      last_name: {
        value: "",
        isValid: false,
      },
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

  useEffect(() => {
    if (isSelectedAcc === "Employer Account") {
      setFormData(
        {
          ...formState.inputs,
          em_name: {
            value: "",
            isValid: false,
          },
          em_email: {
            value: "",
            isValid: false,
          },
          em_password: {
            value: "",
            isValid: false,
          },
          em_phone: {
            value: "",
            isValid: false,
          },
          em_salary: {
            value: "",
            isValid: false,
          },
          em_employees: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          em_name: undefined,
          em_email: undefined,
          em_password: undefined,
          em_phone: undefined,
          em_salary: undefined,
          em_employees: undefined,
        },
        formState.inputs.first_name.isValid &&
          formState.inputs.last_name.isValid &&
          formState.inputs.email.isValid &&
          formState.inputs.password.isValid
      );
    }
  }, [isSelectedAcc, setFormData]);

  const submitAuthHandler = async (e) => {
    e.preventDefault();

    if (isSelectedAcc === "Employer Account") {
      try {
        await fetch("http://localhost:8000/api/employer/signup", {
          method: "POST",
          body: JSON.stringify({
            em_name: formState.inputs.em_name.value,
            em_email: formState.inputs.em_email.value,
            em_password: formState.inputs.em_password.value,
            em_phone: formState.inputs.em_phone.value,
            em_salary: formState.inputs.em_salary.value,
            em_employees: formState.inputs.em_employees.value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await fetch("http://localhost:8000/api/seeker/signup", {
          method: "POST",
          body: JSON.stringify({
            first_name: formState.inputs.first_name.value,
            last_name: formState.inputs.last_name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        marginTop: "7em",
      }}
    >
      <Box className="form_img">
        <div className="flex_buttons">
          <button className={`${activeTab === 0 ? "active" : ""}`}>1</button>
          <Typography color="#fff" fontWeight="bold">
            Choose type of account
          </Typography>
        </div>
        <div className="flex_buttons">
          <button className={`${activeTab === 1 ? "active" : ""}`}>2</button>
          <Typography color="#fff" fontWeight="bold">
            Enter your data
          </Typography>
        </div>
      </Box>
      <Card sx={{ padding: "40px", position: "relative" }}>
        <Link to="/">
          <img src={logo} alt="logo" style={{ paddingBottom: "30px" }} />
        </Link>
        {activeTab === 0 ? (
          <ChooseAcc
            isSelected={isSelectedAcc}
            setSelectedAcc={setIsSelectedAcc}
          />
        ) : (
          <Form
            selectedAcc={isSelectedAcc}
            onChange={inputHandler}
            isSignupMode={isSelectedAcc}
            onSubmitForm={submitAuthHandler}
          />
        )}
        {activeTab === 0 ? (
          <Button
            variant="contained"
            sx={{ position: "absolute", bottom: "20px", right: "20px" }}
            onClick={() => setactiveTab(1)}
            disabled={isSelectedAcc === ""}
          >
            Next
          </Button>
        ) : null}
      </Card>
    </Container>
  );
};

export default SignUp;
