"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";

import { getJobById } from "@/lib/actions/jobs.actions";

import Protected from "@/components/hoc/Protected";
import LoadingJobDetails from "@/components/tempname/LoadingJobDetails";
import AddJobAlert from "@/components/seekers/jobs/details/AddJobAlert";
import JobDetailsInfo from "@/components/seekers/jobs/details/JobDetailsInfo";
import JobsList from "@/components/seekers/jobs/JobsList";
import ApplyToJob from "@/components/seekers/jobs/details/ApplyToJob";

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJobs, isLoading } = useQuery({
    queryFn: () => getJobById(jobId, token as string),
    queryKey: ["job", { jobId }],
  });

  if (isLoading) {
    return <LoadingJobDetails />;
  }

  return (
    <section className="flex py-6 gap-5 justify-between max-xl:flex-col">
      <div className="max-xl:basis-full basis-[38em]">
        <AddJobAlert
          level={fetchedJobs?.job.level || ""}
          type={fetchedJobs?.job.type || ""}
          title={fetchedJobs?.job.title || ""}
        />
      </div>
      <div className="basis-full grow">
        <JobDetailsInfo
          job={fetchedJobs?.job!}
          onApplyJob={() => setDialogOpen(true)}
        />
      </div>
      <div className="basis-1/2">
        <JobsList jobs={fetchedJobs?.jobs} />
      </div>
      <ApplyToJob
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        token={token!}
        jobId={jobId}
      />
    </section>
  );
};

export default Protected(JobDetailsPage, ["seeker"]);
