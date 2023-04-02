import {
  Box,
  Container,
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
import React from "react";

const TopBar = () => {
  return (
    <Box className="search_container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <AiOutlineSearch size={30} fill="grey" cursor="pointer" />
        <TextField value="Designer.." />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AiOutlineSend size={30} fill="grey" />
        <FormControl>
          <InputLabel>Work Location</InputLabel>
          <Select sx={{ width: "10em" }}>
            <MenuItem>Remote</MenuItem>
            <MenuItem>Hybrid</MenuItem>
            <MenuItem>On site</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AiOutlineCalendar size={30} fill="grey" />
        <FormControl>
          <InputLabel>Date posted</InputLabel>
          <Select sx={{ width: "10em" }}>
            <MenuItem>Last 24 hours</MenuItem>
            <MenuItem>Last 3 days</MenuItem>
            <MenuItem>Last 7 days</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TopBar;
