import React, { useContext } from "react";
import { JobContext } from "../../shared/context/JobContext";
import { AuthContext } from "../../shared/context/AuthContext";
import WhyJobSections from "../components/WhyJobSections";
import HowItWorksSection from "../components/HowItWorksSection";
import JobOpenings from "../components/JobOpenings";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { jobs } = useContext(JobContext);
  const { isLoggedIn } = useContext(AuthContext);

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
