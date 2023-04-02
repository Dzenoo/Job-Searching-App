import React from "react";
import MainNavigation from "../navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import MainFooter from "../navigation/MainFooter";

const Root = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default Root;
