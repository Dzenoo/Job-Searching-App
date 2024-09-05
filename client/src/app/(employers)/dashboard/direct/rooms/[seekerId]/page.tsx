"use client";
import Protected from "@/components/hoc/Protected";
import React from "react";

const RoomPage = ({ params }: { params: { seekerId: string } }) => {
  console.log(params.seekerId);

  return <div>RoomPage</div>;
};

export default Protected(RoomPage, ["employer"]);
