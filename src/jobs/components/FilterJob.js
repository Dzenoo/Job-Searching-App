import { PropTypes } from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";

const FilterJob = ({ scheduleData, seniorityData, salaryData }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
      >
        <Typography variant="h4">Details</Typography>
        <Divider />
        <Box>
          <Typography variant="p" color="textSecondary">
            Schedule
          </Typography>
          {scheduleData.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={<Checkbox checked={schedule.checked} />}
            />
          ))}
        </Box>
        <Divider />
        <Box>
          <Typography variant="p" color="textSecondary">
            Seniority Level
          </Typography>
          {seniorityData.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={<Checkbox checked={schedule.checked} />}
            />
          ))}
        </Box>
        <Divider />

        <Box>
          <Typography variant="p" color="textSecondary">
            Salary Range
          </Typography>
          {salaryData.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={<Checkbox checked={schedule.checked} />}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default FilterJob;

FilterJob.propTypes = {
  scheduleData: PropTypes.array.isRequired,
  seniorityData: PropTypes.array.isRequired,
  salaryData: PropTypes.array.isRequired,
};
