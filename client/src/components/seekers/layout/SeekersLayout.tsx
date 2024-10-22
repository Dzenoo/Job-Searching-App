"use client";

import React from "react";

const SeekersLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex-1 base-margin">{children}</main>;
};

export default SeekersLayout;
