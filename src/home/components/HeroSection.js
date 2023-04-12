import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useFormHook } from "../../shared/hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { VALIDATOR_EMAIL } from "../../shared/util/Validators";
import Input from "../../shared/components/Input";
import lumina from "../../shared/assets/lumina.png";
import nexa from "../../shared/assets/nexa.png";
import vantage from "../../shared/assets/vantage.png";
import "react-toastify/dist/ReactToastify.css";

const HeroSection = () => {
  const [formState, inputHandler] = useFormHook(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isLoading, setisLoading] = useState(false);

  const signupNewsletter = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/newsletter/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email: formState.inputs.email.value,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      toast.success("You submmitted for newsletter");

      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      spacing={4}
      padding={5}
    >
      <ToastContainer />
      <Grid
        item
        lg={4.6}
        sx={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
        <Typography variant="h3" fontWeight="bold">
          Make the best move to choose your new job
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Our platform features a user-friendly interface and powerful search
          tools, making it easy to find the job that is right for you.
        </Typography>

        <form
          onSubmit={signupNewsletter}
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <Input
            onInput={inputHandler}
            id="email"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter valid email"
            placeholder="Enter Your Email"
          />

          <Button variant="contained" size="large" type="submit">
            Get started!
          </Button>
        </form>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1.2em" }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <AiOutlineCheckCircle fill="green" />
            Easy Application
          </Typography>
          <Typography
            variant="h6"
            sx={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <AiOutlineCheckCircle fill="green" />
            Update everyday
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={7} md={12} className="card_hero"></Grid>
      <Grid item lg={4.7}>
        <Box>
          <Typography variant="h6" fontWeight="bold" align="left">
            Trusted by top tier companies
          </Typography>
          <hr />
          <Box className="boxCompany">
            <img src={lumina} alt="ico" />
            <img src={nexa} alt="ico" />
            <img src={vantage} alt="ico" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
