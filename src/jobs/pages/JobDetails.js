import React from "react";
import { useParams } from "react-router-dom";

const JOBSLIST = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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

const JobDetails = () => {
  const jobId = useParams().idOfJob;
  const currentJob = JOBSLIST.find((j) => j.id === jobId);

  return (
    <>
      <h1>{currentJob.title}</h1>
      <h1>{currentJob.level}</h1>
      <h1>{currentJob.salary}</h1>
      <h1>{currentJob.shortDescription}</h1>
      <h1>{currentJob.time}</h1>
      <p>{currentJob.city}</p>
    </>
  );
};

export default JobDetails;
