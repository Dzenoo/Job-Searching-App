"use client";

import React from "react";

const EmployersLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex-1">{children}</main>;
};

export default EmployersLayout;
