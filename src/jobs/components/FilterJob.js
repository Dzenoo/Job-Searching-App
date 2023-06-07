import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import { Location, Salary, Schedules, Seniority } from "../../shared/data/data";

const FilterJob = ({
  handleCheckbox,
  checkboxSchedule,
  checkboxLocation,
  checkboxSalary,
  checkboxSeniority,
  setCheckboxSchedule,
  setCheckboxLocation,
  setCheckboxSalary,
  setCheckboxSeniority,
  scheduleCounts,
  locationCounts,
  seniorityCounts,
}) => {
  return (
    <>
      <Typography variant="h4" sx={{ padding: "20px" }}>
        Details
      </Typography>
      <Divider />
      <div
        style={{
          backgroundColor: "#fff",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
        className="filter_box"
      >
        <Box>
          <Typography variant="p" color="textSecondary">
            Schedule
          </Typography>
          {Schedules.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={`${schedule.label} (${
                scheduleCounts[schedule.label] || 0
              })`}
              control={
                <Checkbox
                  checked={schedule.checked}
                  onChange={() =>
                    handleCheckbox(
                      i,
                      checkboxSchedule,
                      setCheckboxSchedule,
                      "schedule"
                    )
                  }
                />
              }
            />
          ))}
        </Box>
        <Divider />
        <Box>
          <Typography variant="p" color="textSecondary">
            Seniority Level
          </Typography>
          {Seniority.map((seniority, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={`${seniority.label} (${
                seniorityCounts[seniority.label] || 0
              })`}
              control={
                <Checkbox
                  checked={seniority.checked}
                  onChange={() =>
                    handleCheckbox(
                      i,
                      checkboxSeniority,
                      setCheckboxSeniority,
                      "level"
                    )
                  }
                />
              }
            />
          ))}
        </Box>
        <Box>
          <Typography variant="p" color="textSecondary">
            Salary Range
          </Typography>
          {Salary.map((salary, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={salary.label}
              control={
                <Checkbox
                  checked={salary.checked}
                  onChange={() =>
                    handleCheckbox(
                      i,
                      checkboxSalary,
                      setCheckboxSalary,
                      "salary"
                    )
                  }
                />
              }
            />
          ))}
        </Box>
        <Box>
          <Typography variant="p" color="textSecondary">
            Location
          </Typography>
          {Location.map((location, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={`${location.label} (${
                locationCounts[location.label] || 0
              })`}
              control={
                <Checkbox
                  checked={location.checked}
                  onChange={() =>
                    handleCheckbox(
                      i,
                      checkboxLocation,
                      setCheckboxLocation,
                      "location"
                    )
                  }
                />
              }
            />
          ))}
        </Box>
      </div>
    </>
  );
};
export default FilterJob;
