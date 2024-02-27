"use client";

import React from "react";
import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";

const Jobs = () => {
  return (
    <>
      <JobsList />
    </>
  );
};

export default Protected(Jobs);
