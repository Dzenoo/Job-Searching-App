"use client";
import Protected from "@/components/hoc/Protected";
import React from "react";

const RoomsPage = () => {
  return <div>RoomsPage</div>;
};

export default Protected(RoomsPage, ["employer"]);
