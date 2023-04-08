import { Select, Typography, Box, Alert } from "@mui/material";
import React from "react";
import JobItem from "./JobItem";
import PropTypes from "prop-types";

const JobList = ({ jobs }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Recommended Jobs ({jobs.length})
        </Typography>
        <Alert severity="info">
          Please note that filtering by more than one checkbox criteria at a
          time may limit the number of results available. I recommend trying one
          checkbox filter at a time to get the best results. For example, you
          can filter by 'Schedule' first, then uncheck and try 'Seniority' or
          'Salary'.
        </Alert>
      </Box>
      <ul className="job_list">
        {jobs.map((job) => {
          const {
            id,
            employer,
            title,
            city,
            salary,
            time,
            level,
            shortDescription,
          } = job;
          return (
            <JobItem
              key={id}
              id={id}
              logo={employer.em_image}
              title={title}
              city={city}
              salary={salary}
              time={time}
              level={level}
              shortDescription={shortDescription}
            />
          );
        })}
      </ul>
    </>
  );
};

export default JobList;

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
};
