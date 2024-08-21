"use client";

import Protected from "@/components/Hoc/Protected";
import { Button } from "@/components/ui/button";
import React from "react";

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-base-black">Edit This Job</h1>
        </div>
        <div>
          <Button variant="default">Save</Button>
        </div>
      </div>
    </section>
  );
};

export default Protected(EditJobPage, ["employer"]);
