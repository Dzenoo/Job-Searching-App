"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default AppThemeProvider;
