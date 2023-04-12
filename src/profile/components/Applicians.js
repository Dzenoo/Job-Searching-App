import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
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
        `http://localhost:8000/api/applications/${id}/updateStatus`,
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
        <Grid container spacing={4}>
          {applicians.map((a) => (
            <Grid item lg={6}>
              <Card
                sx={{
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                  <Typography color="textSecondary" variant="p">
                    {a.country}
                  </Typography>
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
                      <AiOutlineMail />
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
                      <AiOutlinePhone />
                      {a.phone}
                    </Typography>
                  </Box>
                </CardActions>
                <Button variant="contained">Download cv</Button>
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
