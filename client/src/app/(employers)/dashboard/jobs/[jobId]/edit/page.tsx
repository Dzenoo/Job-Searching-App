"use client";

import React from "react";
import Protected from "@/components/tempname/Protected";
import UpdateJobForm from "@/components/employers/dashboard/jobs/new/UpdateJobForm";

import { useQuery } from "react-query";
import { getJob } from "@/lib/actions/employers.actions";

import useAuthentication from "@/hooks/useAuthentication";
import { JobTypes } from "@/types";

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJob } = useQuery({
    queryFn: () => getJob(token as string, params.jobId),
  });

  return (
    <section>
      <UpdateJobForm
        isEdit={true}
        jobId={params.jobId}
        formData={fetchedJob?.job as JobTypes}
      />
    </section>
  );
};

export default Protected(EditJobPage, ["employer"]);
