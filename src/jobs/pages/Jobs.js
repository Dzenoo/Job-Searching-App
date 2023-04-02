import React from "react";
import TopBar from "../components/TopBar";
import { Grid } from "@mui/material";
import FilterJob from "../components/FilterJob";
import JobList from "../components/JobList";

const Schedules = [
  {
    label: "Full time Jobs",
    checked: false,
  },
  {
    label: "Part time Jobs",
    checked: false,
  },
  {
    label: "Remote Jobs",
    checked: true,
  },
  {
    label: "Internship Jobs",
    checked: false,
  },
];

const Seniority = [
  {
    label: "Entry Level",
    checked: false,
  },
  {
    label: "Mid Level",
    checked: false,
  },
  {
    label: "Senior Level",
    checked: true,
  },
  {
    label: "Student Level",
    checked: false,
  },
];

const Salary = [
  {
    label: "$700 - $1200",
    checked: false,
  },
  {
    label: "$1200 - $1500",
    checked: false,
  },
  {
    label: "$1500 - $1800",
    checked: true,
  },
  {
    label: "$1800 - $2000",
    checked: false,
  },
];

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
        <Grid item>
          <JobList />
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
