import { useEffect, useState } from "react";
import { createContext } from "react";
import { Schedules, Seniority, Salary } from "../data/data";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [checkboxSchedule, setCheckboxSchedule] = useState(Schedules);
  const [checkboxSeniority, setCheckboxSeniority] = useState(Seniority);
  const [checkboxSalary, setCheckboxSalary] = useState(Salary);

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
      } catch (error) {
        setisLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // CHECKBOXES FUNCTION FOR SCHEDULE //
  const handleCheckboxScheduleChange = (index) => {
    const newCheckboxes = [...checkboxSchedule];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSchedule(newCheckboxes);

    const allUnchecked = newCheckboxes.every((checkbox) => !checkbox.checked);

    console.log(allUnchecked);

    if (allUnchecked) {
      setfilteredJobs(jobs);
      return;
    }

    const checkedSchedules = newCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    const newFilteredJobs = jobs.filter((job) =>
      checkedSchedules.includes(job.schedule)
    );

    setfilteredJobs(newFilteredJobs);
    filterJobsByCheckbox();
  };

  // CHECKBOXES FUNCTION FOR SENIORITY //
  const handleCheckboxSeniorityChange = (index) => {
    const newCheckboxes = [...checkboxSeniority];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSeniority(newCheckboxes);

    const allUnchecked = newCheckboxes.every((checkbox) => !checkbox.checked);
    if (allUnchecked) {
      setfilteredJobs(jobs);
      return;
    }

    const checkedSchedules = newCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    const newFilteredJobs = jobs.filter((job) =>
      checkedSchedules.includes(job.level)
    );

    setfilteredJobs(newFilteredJobs);
    filterJobsByCheckbox();
  };

  // CHECKBOXES FUNCTION FOR SALARY //
  const handleCheckboxSalaryChange = (index) => {
    const newCheckboxes = [...checkboxSalary];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxSalary(newCheckboxes);

    const allUnchecked = newCheckboxes.every((checkbox) => !checkbox.checked);
    if (allUnchecked) {
      setfilteredJobs(jobs);
      return;
    }

    const checkedSchedules = newCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    const newFilteredJobs = jobs.filter((job) =>
      checkedSchedules.includes(job.salary)
    );

    setfilteredJobs(newFilteredJobs);
    filterJobsByCheckbox();
  };

  const handleFilterSearch = (e) => {
    const inputQuery = e.target.value;
    const searchedJobs = jobs.filter((j) =>
      j.title.toLowerCase().includes(inputQuery)
    );
    setfilteredJobs(searchedJobs);
  };

  const handleFilterLocation = (location, city) => {
    let newFilteredJobs;
    if (location) {
      newFilteredJobs = jobs.filter(
        (j) => j.schedule === location && j.city === city
      );
    }
    setfilteredJobs(newFilteredJobs);
  };

  const filterJobsByCheckbox = () => {
    const filtered = jobs.filter((job) => {
      // Filter by schedule
      if (
        checkboxSchedule.some(
          (checkbox) => checkbox.checked && checkbox.label === job.time
        )
      ) {
        return true;
      }
      // Filter by seniority
      if (
        checkboxSeniority.some(
          (checkbox) => checkbox.checked && checkbox.label === job.level
        )
      ) {
        return true;
      }
      // Filter by salary
      if (
        checkboxSalary.some(
          (checkbox) =>
            checkbox.checked &&
            job.salary >= checkbox.label[0] &&
            job.salary <= checkbox.label[2]
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
        handleFilterLocation,
        clearFilter,
        handleCheckboxScheduleChange,
        handleCheckboxSeniorityChange,
        handleCheckboxSalaryChange,
        checkboxSchedule,
        checkboxSeniority,
        checkboxSalary,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
