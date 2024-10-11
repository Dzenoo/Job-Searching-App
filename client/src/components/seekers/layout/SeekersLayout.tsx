"use client";

import React from "react";
import Protected from "@/components/hoc/Protected";

const SeekersLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex-1 base-margin">{children}</main>;
};

export default Protected(SeekersLayout, ["seeker"]);
