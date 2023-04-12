import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  AiOutlineSearch,
  AiOutlineSend,
  AiOutlineCalendar,
} from "react-icons/ai";
import React, { useState } from "react";

const TopBar = ({ handleFilterSearch, handleFilterLocation, clearFilter }) => {
  return (
    <Box className="search_container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <AiOutlineSearch
          size={30}
          fill="grey"
          cursor="pointer"
          onClick={handleFilterSearch}
        />
        <TextField
          sx={{ margin: "auto" }}
          onChange={(e) => handleFilterSearch(e)}
          placeholder="Frontend Developer"
        />
      </Box>
      <Button variant="contained" onClick={clearFilter}>
        Show all
      </Button>
    </Box>
  );
};

export default TopBar;
