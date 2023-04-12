import { useEffect, useState, createContext } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // Fetch Jobs
  useEffect(() => {
    setisLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/jobs/");
        if (!response.ok) {
          throw new Error("Could not fetch jobs");
        }
        const responseData = await response.json();
        setJobs(responseData.jobs);
        setfilteredJobs(responseData.jobs);
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Checkbox filter
  const handleCheckbox = (index, state, setState, filterType) => {
    const newCheckboxes = [...state];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setState(newCheckboxes);
    const allUnchecked = newCheckboxes.every((checkbox) => !checkbox.checked);

    if (allUnchecked) {
      setfilteredJobs(jobs);
      return;
    }

    const checkedBox = newCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
    const newFilteredJobs = jobs.filter((job) =>
      checkedBox.includes(job[filterType])
    );

    setfilteredJobs(newFilteredJobs);
    filterJobsByCheckbox(state);
  };

  // Search Filter
  const handleFilterSearch = (e) => {
    const inputQuery = e.target.value;
    const searchedJobs = jobs.filter((j) =>
      j.title.toLowerCase().includes(inputQuery)
    );
    setfilteredJobs(searchedJobs);
  };

  const filterJobsByCheckbox = (state) => {
    const filtered = filteredJobs.filter((job) => {
      // Filter by schedule
      if (
        state.some(
          (checkbox) => checkbox.checked && checkbox.label === job.time
        )
      ) {
        return true;
      }
      // Filter by seniority
      if (
        state.some(
          (checkbox) => checkbox.checked && checkbox.label === job.level
        )
      ) {
        return true;
      }
      // Filter by salary
      if (
        state.some(
          (checkbox) =>
            checkbox.checked &&
            job.salary >= checkbox.label[0] &&
            job.salary <= checkbox.label[2]
        )
      ) {
        return true;
      }
      if (
        state.some(
          (checkbox) => checkbox.checked && checkbox.label === job.schedule
        )
      ) {
        return true;
      }
      return false;
    });
    setfilteredJobs(filtered);
  };

  const clearFilter = () => {
    setfilteredJobs(jobs);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        handleFilterSearch,
        clearFilter,
        handleCheckbox,
        isLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
