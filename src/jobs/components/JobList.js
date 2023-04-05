import { Select, Typography, MenuItem, Box } from "@mui/material";
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
      </Box>
      <ul className="job_list">
        {jobs.map((job) => {
          const {
            id,
            logo,
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
              logo={logo}
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
