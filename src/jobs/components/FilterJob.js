import { PropTypes } from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const FilterJob = ({ scheduleData, seniorityData, salaryData }) => {
  const [checkboxSchedule, setCheckboxSchedule] = useState(scheduleData);
  const [checkboxSeniority, setCheckboxSeniority] = useState(seniorityData);
  const [checkboxSalary, setCheckboxSalary] = useState(salaryData);

  const handleCheckboxScheduleChange = (index) => {
    const newCheckboxes = [...checkboxSchedule];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSchedule(newCheckboxes);
  };

  const handleCheckboxSeniorityChange = (index) => {
    const newCheckboxes = [...checkboxSeniority];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSeniority(newCheckboxes);
  };

  const handleCheckboxSalaryChange = (index) => {
    const newCheckboxes = [...checkboxSalary];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSalary(newCheckboxes);
  };

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
          {checkboxSchedule.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={
                <Checkbox
                  checked={schedule.checked}
                  onChange={() => handleCheckboxScheduleChange(i)}
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
          {checkboxSeniority.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={
                <Checkbox
                  checked={schedule.checked}
                  onChange={() => handleCheckboxSeniorityChange(i)}
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
          {checkboxSalary.map((schedule, i) => (
            <FormControlLabel
              sx={{ display: "flex" }}
              key={i}
              label={schedule.label}
              control={
                <Checkbox
                  checked={schedule.checked}
                  onChange={() => handleCheckboxSalaryChange(i)}
                />
              }
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
