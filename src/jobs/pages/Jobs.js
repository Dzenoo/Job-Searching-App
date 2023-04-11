import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { JobContext } from "../../shared/context/JobContext";
import TopBar from "../components/TopBar";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";
import { BarLoader } from "react-spinners";

const Jobs = () => {
  const {
    handleFilterSearch,
    clearFilter,
    filteredJobs,
    handleCheckbox,
    isLoading,
  } = useContext(JobContext);

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <>
      <TopBar
        handleFilterSearch={handleFilterSearch}
        clearFilter={clearFilter}
      />
      <Grid container>
        <Grid item lg={2.2}>
          <FilterJob handleCheckbox={handleCheckbox} />
        </Grid>
        <Grid item lg={9}>
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
