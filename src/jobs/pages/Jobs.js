import React from "react";
import { Grid } from "@mui/material";
import { JOBSLIST, Schedules, Seniority, Salary } from "../../shared/data/data";
import TopBar from "../components/TopBar";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";

const Jobs = () => {
  return (
    <>
      <TopBar />
      <Grid container>
        <Grid item lg={2}>
          <FilterJob
            scheduleData={Schedules}
            seniorityData={Seniority}
            salaryData={Salary}
          />
        </Grid>
        <Grid item lg={10}>
          <JobList jobs={JOBSLIST} />
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
