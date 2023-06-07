import { useEffect, useState, createContext } from "react";
import { Schedules, Seniority } from "../data/data";
import { Salary } from "../data/data";
import { Location } from "../data/data";
export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [checkboxSchedule, setCheckboxSchedule] = useState(Schedules);
  const [checkboxSeniority, setCheckboxSeniority] = useState(Seniority);
  const [checkboxSalary, setCheckboxSalary] = useState(Salary);
  const [checkboxLocation, setCheckboxLocation] = useState(Location);
  const [scheduleCounts, setScheduleCounts] = useState({});
  const [seniorityCounts, setSeniorityCounts] = useState({});
  const [locationCounts, setLocationCounts] = useState({});

  // Fetch Jobs
  useEffect(() => {
    setisLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://job-gk5a.onrender.com/api/jobs/");
        if (!response.ok) {
          throw new Error("Could not fetch jobs");
        }
        const responseData = await response.json();
        setJobs(responseData.jobs);
        setfilteredJobs(responseData.jobs);
        setisLoading(false);

        const newScheduleCounts = {};
        const newSeniorityCounts = {};
        const newLocationCounts = {};

        responseData.jobs.forEach((job) => {
          newScheduleCounts[job.time] = (newScheduleCounts[job.time] || 0) + 1;
          newSeniorityCounts[job.level] =
            (newSeniorityCounts[job.level] || 0) + 1;
          newLocationCounts[job.schedule] =
            (newLocationCounts[job.schedule] || 0) + 1;
        });

        setScheduleCounts(newScheduleCounts);
        setSeniorityCounts(newSeniorityCounts);
        setLocationCounts(newLocationCounts);
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
    filterJobsByCheckbox();
  };

  // Search Filter
  const handleFilterSearch = (e) => {
    const inputQuery = e.target.value;
    const searchedJobs = jobs.filter((j) =>
      j.title.toLowerCase().includes(inputQuery)
    );
    setfilteredJobs(searchedJobs);
  };

  const filterJobsByCheckbox = () => {
    const checkboxCategories = [
      { state: checkboxSchedule, filterType: "time" },
      { state: checkboxSeniority, filterType: "level" },
      { state: checkboxSalary, filterType: "salary" },
      { state: checkboxLocation, filterType: "schedule" },
    ];

    const filtered = jobs.filter((job) => {
      for (let { state, filterType } of checkboxCategories) {
        const checkedBoxes = state.filter((checkbox) => checkbox.checked);

        if (checkedBoxes.length > 0) {
          if (filterType === "salary") {
            if (
              !checkedBoxes.some(
                (checkbox) =>
                  job[filterType] >= checkbox.label[0] &&
                  job[filterType] <= checkbox.label[2]
              )
            ) {
              return false;
            }
          } else {
            if (
              !checkedBoxes.some(
                (checkbox) => checkbox.label === job[filterType]
              )
            ) {
              return false;
            }
          }
        }
      }
      return true;
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
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
