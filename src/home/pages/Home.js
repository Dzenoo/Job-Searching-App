import React from "react";
import HeroSection from "../components/HeroSection";
import WhyJobSections from "../components/WhyJobSections";
import HowItWorksSection from "../components/HowItWorksSection";
import JobOpenings from "../components/JobOpenings";

const JOBS = [
  {
    id: 1,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/2_u7fely.png",
    title: "Web Developer",
    company: "Tech Solutions",
    shortDescription:
      "Seeking a skilled web developer to join our team and help build cutting-edge websites and applications.",
    city: "San Francisco",
    salary: "$80,000",
    time: "Part Time",
  },
  {
    id: 2,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/1_udwpiq.png",
    title: "Marketing Manager",
    company: "Bright Ideas",
    shortDescription:
      "Looking for a creative and driven marketing manager to lead our marketing team and drive sales growth.",
    city: "New York City",
    salary: "$90,000",
    time: "Full Time",
  },
  {
    id: 3,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/3_lzvzws.png",
    title: "Graphic Designer",
    company: "Artistic Vision",
    shortDescription:
      "Seeking a talented and experienced graphic designer to create stunning visuals and help bring our brand to life.",
    city: "Los Angeles",
    salary: "$60,000",
    time: "Part Time",
  },
  {
    id: 4,
    logo: "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680438568/4_ns9xhr.png",
    title: "Sales Associate",
    company: "Prime Sales",
    shortDescription:
      "Join our dynamic sales team and help us exceed our goals while delivering exceptional customer service.",
    city: "Miami",
    salary: "$40,000",
    time: "Full Time",
  },
];

const Home = () => {
  return (
    <>
      <HeroSection />
      <WhyJobSections />
      <HowItWorksSection />
      <JobOpenings jobs={JOBS} />
    </>
  );
};

export default Home;
