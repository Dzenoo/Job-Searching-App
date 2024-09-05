"use client";

import React from "react";
import Protected from "@/components/hoc/Protected";
import UpdateJobForm from "@/components/shared/forms/UpdateJobForm";

const NewJobPage = () => {
  return (
    <section>
      <UpdateJobForm isEdit={false} />
    </section>
  );
};

export default Protected(NewJobPage, ["employer"]);
