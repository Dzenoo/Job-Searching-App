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
  const [scheduleValue, setscheduleValue] = useState("Remote");
  const [cityValue, setCityValue] = useState("London");
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
            value={scheduleValue}
            onChange={(e) => setscheduleValue(e.target.value)}
          >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AiOutlineCalendar size={30} fill="grey" />
        <FormControl>
          <InputLabel>City</InputLabel>
          <Select
            id="city"
            sx={{ width: "10em" }}
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
          >
            <MenuItem value="London">London</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="Berlin">Berlin</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        disabled={!scheduleValue || !cityValue}
        onClick={(e) => handleFilterLocation(scheduleValue, cityValue)}
      >
        Filter
      </Button>
      <Button onClick={clearFilter}>Show all</Button>
    </Box>
  );
};

export default TopBar;
