import React from "react";
import { JOBSLIST } from "../../shared/data/data";
import HeroSection from "../components/HeroSection";
import WhyJobSections from "../components/WhyJobSections";
import HowItWorksSection from "../components/HowItWorksSection";
import JobOpenings from "../components/JobOpenings";

const Home = () => {
  return (
    <>
      <HeroSection />
      <WhyJobSections />
      <HowItWorksSection />
      <JobOpenings jobs={JOBSLIST.slice(0, 4)} />
    </>
  );
};

export default Home;
