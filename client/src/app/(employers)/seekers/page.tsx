"use client";

import Protected from "@/components/Hoc/Protected";
import React from "react";

const SeekersPage = () => {
  return <div>SeekersPage</div>;
};

export default Protected(SeekersPage, ["employer"]);
