import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import WhyJobSections from "../components/WhyJobSections";
import HowItWorksSection from "../components/HowItWorksSection";
import JobOpenings from "../components/JobOpenings";
import { JobContext } from "../../shared/context/JobContext";

const Home = () => {
  const { jobs } = useContext(JobContext);

  return (
    <>
      <HeroSection />
      <WhyJobSections />
      <HowItWorksSection />
      <JobOpenings jobs={jobs.slice(0, 4)} />
    </>
  );
};

export default Home;
