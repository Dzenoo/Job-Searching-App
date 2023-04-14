import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BarLoader } from "react-spinners";

const Applicians = ({ applicians }) => {
  const [isLoading, setisLoading] = useState(false);

  const updateStatus = async (id, e) => {
    e.preventDefault();
    const status = e.target.value;
    setisLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/applications/${id}/updateStatus`,
        {
          method: "POST",
          body: JSON.stringify({
            status: status,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setisLoading(false);
      toast.success("You are updated status");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="loading_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <Alert severity="info">
          Note that when you updating status, you must refresh page to see
          changes
        </Alert>
        <br />
        <Grid container spacing={2}>
          {applicians.map((a) => (
            <Grid item lg={5} sm={12}>
              <Card
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  right: "42px",
                }}
              >
                <Select
                  id="schedule"
                  value={a.status}
                  onChange={(e) => updateStatus(a._id, e)}
                >
                  <MenuItem value="Screening">Screening</MenuItem>
                  <MenuItem value="Interview">Interview</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "30px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "100%",
                      width: "160px",
                      margin: "auto",
                    }}
                    src="https://res.cloudinary.com/dzwb60tk1/image/upload/v1678535834/Untitled_design_3_zbm2cx.png"
                    alt="img"
                  />
                  <Typography variant="p" fontWeight="bold" fontSize="24px">
                    {a.name} {a.surname}
                  </Typography>
                  <Typography color="textSecondary" variant="p"></Typography>
                  <Typography variant="p">Job: {a.job}</Typography>
                </Box>
                <CardActions>
                  <Box
                    sx={{
                      backgroundColor: "rgb(227, 245, 255)",
                      padding: "30px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <AiOutlineMail size={20} />
                      {a.email}
                    </Typography>
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <AiOutlinePhone size={20} />
                      {a.phone}
                    </Typography>
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <AiOutlineGithub size={20} />
                      <a href={a.github} target="_blank">
                        {a.github}
                      </a>
                    </Typography>
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <AiOutlineLinkedin size={20} />
                      <a href={a.linkedin} target="_blank">
                        {a.linkedin}
                      </a>
                    </Typography>
                  </Box>
                </CardActions>
                {a.cv && (
                  <a
                    href={`${process.env.REACT_APP_BACKEND}/${a.cv}`}
                    download
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button fullWidth variant="contained">
                      View CV
                    </Button>
                  </a>
                )}
                <div
                  className={`boxstatus ${
                    a.status === "Screening" ? "screening" : "boxstatus"
                  } && ${
                    a.status === "Interview" ? "interview" : "boxstatus"
                  } && ${a.status === "Hired" ? "hired" : "boxstatus"} && ${
                    a.status === "Rejected" ? "rejected" : "boxstatus"
                  }`}
                >
                  Status: {a.status}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Applicians;
