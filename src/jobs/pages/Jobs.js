import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { Schedules, Seniority, Salary } from "../../shared/data/data";
import TopBar from "../components/TopBar";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";
import { JobContext } from "../../shared/context/JobContext";

const Jobs = () => {
  const {
    handleFilterSearch,
    handleFilterLocation,
    clearFilter,
    filteredJobs,
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
            scheduleData={Schedules}
            seniorityData={Seniority}
            salaryData={Salary}
          />
        </Grid>
        <Grid item lg={10}>
          <JobList jobs={filteredJobs} />
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
