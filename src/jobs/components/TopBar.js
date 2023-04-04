import {
  Box,
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

const TopBar = ({ handleFilterSearch, handleFilterLocation }) => {
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
        <TextField fullWidth onChange={(e) => handleFilterSearch(e)} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AiOutlineSend size={30} fill="grey" />
        <FormControl>
          <InputLabel>Work Location</InputLabel>
          <Select
            id="schedule"
            sx={{ width: "10em" }}
            onChange={(e) => handleFilterLocation(e.target.value)}
          >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
            {/* <MenuItem value="On site">On site</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AiOutlineCalendar size={30} fill="grey" />
        <FormControl>
          <InputLabel>City</InputLabel>
          <Select id="city" sx={{ width: "10em" }}>
            <MenuItem>London</MenuItem>
            <MenuItem>New York</MenuItem>
            <MenuItem>Berlin</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TopBar;
