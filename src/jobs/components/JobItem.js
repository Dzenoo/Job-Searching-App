import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
const JobItem = ({
  id,
  logo,
  title,
  city,
  salary,
  time,
  level,
  shortDescription,
}) => {
  return (
    <Card sx={{ padding: "20px", maxWidth: "400px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt={title} style={{ width: "100px" }} />
        <Typography variant="p" color="textSecondary">
          2.0.2022
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="p"
            fontWeight="bold"
            color="purple"
            sx={{
              backgroundColor: "rgba(205, 9, 195, 0.148)",
              padding: "8px 20px",
              borderRadius: "20px",
            }}
          >
            {level}
          </Typography>
          <Typography
            variant="p"
            fontWeight="bold"
            color="green"
            sx={{
              backgroundColor: "rgba(23, 240, 81, 0.148)",
              padding: "8px 20px",
              borderRadius: "20px",
            }}
          >
            ${salary}
          </Typography>
          <Typography
            variant="p"
            fontWeight="bold"
            color="rgb(9, 43, 153)"
            sx={{
              backgroundColor: "rgba(25, 74, 236, 0.148)",
              padding: "8px 20px",
              borderRadius: "20px",
            }}
          >
            {time}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography variant="p" fontWeight="bold">
            <CiLocationOn size={24} /> {city}
          </Typography>
          <Typography color="textSecondary" sx={{ wordBreak: "break-word" }}>
            {shortDescription.substring(0, 60)}...
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Link
          to={`/jobs/${id}`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Button variant="contained" size="large" fullWidth>
            View Job
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default JobItem;

JobItem.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};
