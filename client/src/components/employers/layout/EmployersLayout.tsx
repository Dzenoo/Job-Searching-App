"use client";

import React from "react";
import Protected from "@/components/hoc/Protected";

const EmployersLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex-1">{children}</main>;
};

export default Protected(EmployersLayout, ["employer"]);
