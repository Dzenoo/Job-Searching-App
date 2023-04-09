import React from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { AiOutlineDollarCircle, AiOutlineStar } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { BsBriefcase } from "react-icons/bs";
import { Link } from "react-router-dom";

const CompanyItem = ({ id, logo, name, salary, employers, jobs, rating }) => {
  return (
    <Card id={id} sx={{ padding: "40px" }}>
      <Link to={id}>
        <img src={logo} alt={name} />
      </Link>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <b>{rating}</b>
          <AiOutlineStar fill="gold" size={28} />
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(205, 9, 195, 0.148)",
            color: "purple",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "30px",
          }}
        >
          <BsBriefcase />
          {jobs} jobs
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(23, 240, 81, 0.148)",
            color: "green",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "30px",
          }}
        >
          <AiOutlineDollarCircle />
          {salary}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(25, 74, 236, 0.148)",
            color: "royalblue",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "30px",
          }}
        >
          <GrUserWorker />
          {employers} employers
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CompanyItem;

CompanyItem.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  employers: PropTypes.number.isRequired,
  jobs: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
};
