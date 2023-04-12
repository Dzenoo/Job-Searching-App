import { Typography, Box, Alert } from "@mui/material";
import React from "react";
import JobItem from "./JobItem";
import PropTypes from "prop-types";

const JobList = ({ jobs }) => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">
        Jobs ({jobs.length})
      </Typography>
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
            createdAt,
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
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </Box>
  );
};

export default JobList;

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
};
