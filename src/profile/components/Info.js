import { Typography } from "@mui/material";
import React from "react";

const Info = ({ biography }) => {
  return (
    <>
      <Typography variant="h4">Biography</Typography>
      <Typography>{biography}</Typography>
    </>
  );
};

export default Info;
