import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { JobContext } from "../../shared/context/JobContext";
import TopBar from "../components/TopBar";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";

const Jobs = () => {
  const {
    handleFilterSearch,
    handleFilterLocation,
    clearFilter,
    filteredJobs,
    handleCheckboxScheduleChange,
    handleCheckboxSeniorityChange,
    handleCheckboxSalaryChange,
    checkboxSchedule,
    checkboxSeniority,
    checkboxSalary,
  } = useContext(JobContext);

  return (
    <>
      <TopBar
        handleFilterSearch={handleFilterSearch}
        handleFilterLocation={handleFilterLocation}
        clearFilter={clearFilter}
      />
      <Grid container>
        <Grid item lg={2}>
          <FilterJob
            scheduleData={checkboxSchedule}
            seniorityData={checkboxSeniority}
            salaryData={checkboxSalary}
            scheduceFilter={handleCheckboxScheduleChange}
            seniorityFilter={handleCheckboxSeniorityChange}
            salaryFilter={handleCheckboxSalaryChange}
          />
        </Grid>
        <Grid item lg={10}>
          <JobList jobs={filteredJobs} />
          {filteredJobs.length === 0 && (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              There is no jobs for that data
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
