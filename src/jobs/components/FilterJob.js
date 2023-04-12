import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import { Schedules, Seniority, Salary, Location } from "../../shared/data/data";
import React, { useState } from "react";

const FilterJob = ({ handleCheckbox }) => {
  const [checkboxSchedule, setCheckboxSchedule] = useState(Schedules);
  const [checkboxSeniority, setCheckboxSeniority] = useState(Seniority);
  const [checkboxSalary, setCheckboxSalary] = useState(Salary);
  const [checkboxLocation, setCheckboxLocation] = useState(Location);

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
              label={schedule.label}
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
          {Seniority.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={
                <Checkbox
                  checked={schedule.checked}
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
        <Divider />
        <Box>
          <Typography variant="p" color="textSecondary">
            Salary Range
          </Typography>
          {Salary.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={
                <Checkbox
                  checked={schedule.checked}
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
              label={location.label}
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
