import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { JobContext } from "../../shared/context/JobContext";
import { BarLoader } from "react-spinners";
import Pagination from "../../shared/components/Pagination";
import TopBar from "../components/TopBar";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(9);
  const {
    handleFilterSearch,
    clearFilter,
    filteredJobs,
    handleCheckbox,
    isLoading,
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
  } = useContext(JobContext);

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <TopBar
        handleFilterSearch={handleFilterSearch}
        clearFilter={clearFilter}
      />
      <Grid container>
        <Grid item lg={2.2}>
          <FilterJob
            handleCheckbox={handleCheckbox}
            checkboxLocation={checkboxLocation}
            checkboxSalary={checkboxSalary}
            checkboxSeniority={checkboxSeniority}
            checkboxSchedule={checkboxSchedule}
            setCheckboxLocation={setCheckboxLocation}
            setCheckboxSchedule={setCheckboxSchedule}
            setCheckboxSeniority={setCheckboxSeniority}
            setCheckboxSalary={setCheckboxSalary}
            scheduleCounts={scheduleCounts}
            locationCounts={locationCounts}
            seniorityCounts={seniorityCounts}
          />
        </Grid>
        <Grid item lg={9} justifyContent="center" alignItems="center">
          <JobList jobs={currentJobs} />
          {filteredJobs.length === 0 && (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              There is no jobs for that data
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              tutoPerPage={jobsPerPage}
              totalJobs={filteredJobs.length}
              paginate={paginate}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
