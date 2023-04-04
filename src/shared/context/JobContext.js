import { useState } from "react";
import { createContext } from "react";
import { JOBSLIST } from "../data/data";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(JOBSLIST);
  const [filteredJobs, setfilteredJobs] = useState(JOBSLIST);

  const handleFilterSearch = (e) => {
    const inputQuery = e.target.value;
    const newJobs = [...jobs];
    const searchedJobs = newJobs.filter((j) =>
      j.title.toLowerCase().includes(inputQuery)
    );
    if (searchedJobs.length === 0) {
      alert(`Unfortunately, no jobs could be found for ${inputQuery}`);
    } else {
      setfilteredJobs(searchedJobs);
    }
  };

  const handleFilterLocation = (location) => {
    const newJobs = [...jobs];

    let newFilteredJobs;
    if (location) {
      newFilteredJobs = newJobs.filter((j) => j.schedule === location);
    }

    setfilteredJobs(newFilteredJobs);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        handleFilterSearch,
        handleFilterLocation,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
