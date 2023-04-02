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

const JOBSLIST = [
  {
    id: 1,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Web Developer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "New York",
    salary: "$90,000",
    time: "Part Time",
    level: "Medior",
  },
  {
    id: 2,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Web Designer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "London",
    salary: "$43,000",
    time: "Volunteering",
    level: "Junior",
  },
  {
    id: 3,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "UI / UX Designer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Berlin",
    salary: "$54,000",
    time: "Full Time",
    level: "Junior",
  },
  {
    id: 4,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "React Engineer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Manchester",
    salary: "$67,000",
    time: "Part Time",
    level: "Medior",
  },
  {
    id: 5,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Full Stack Developer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Los Angeles",
    salary: "$78,000",
    time: "Full Time",
    level: "Senior",
  },
  {
    id: 6,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Node Js Developer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "",
    salary: "$45,000",
    time: "Internship",
    level: "Junior",
  },
  {
    id: 7,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Java Angular Developer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Los Angeles",
    salary: "$80,000",
    time: "Project work",
    level: "Senior",
  },
  {
    id: 8,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "MERN stack developer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Los Angeles",
    salary: "$60,000",
    time: "Part Time",
    level: "Medior",
  },
  {
    id: 9,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Graphic Designer",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Los Angeles",
    salary: "$30,000",
    time: "Full Time",
    level: "Junior",
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
        <Grid item lg={10}>
          <JobList jobs={JOBSLIST} />
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
