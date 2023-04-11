import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import WhyJobSections from "../components/WhyJobSections";
import HowItWorksSection from "../components/HowItWorksSection";
import JobOpenings from "../components/JobOpenings";
import { JobContext } from "../../shared/context/JobContext";
import { AuthContext } from "../../shared/context/AuthContext";

const Home = () => {
  const { jobs } = useContext(JobContext);
  const { isLoggedIn } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <HeroSection />
      <WhyJobSections />
      <HowItWorksSection />
      <JobOpenings jobs={jobs.slice(0, 4)} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Home;
