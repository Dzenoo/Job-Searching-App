"use client";

import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { useQuery } from "react-query";
import { getJobById } from "@/lib/actions/jobs.actions";
import LoadingJobDetails from "@/components/loaders/LoadingJobDetails";
import AddJobAlert from "@/components/seekers/jobs/Details/AddJobAlert";
import JobDetailsInfo from "@/components/seekers/jobs/Details/JobDetailsInfo";
import JobsList from "@/components/seekers/jobs/JobsList";

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJobs, isLoading } = useQuery({
    queryFn: () => getJobById(jobId, token as string),
    queryKey: ["job", { jobId }],
  });

  if (isLoading) {
    return <LoadingJobDetails />;
  }

  return (
    <section className="flex py-6 gap-[10px] justify-between max-xl:flex-col">
      <div className="max-xl:basis-full basis-[38em]">
        <AddJobAlert
          level={fetchedJobs?.job.level || ""}
          type={fetchedJobs?.job.type || ""}
          title={fetchedJobs?.job.title || ""}
        />
      </div>
      <div className="basis-full grow">
        <JobDetailsInfo job={fetchedJobs?.job!} onApplyJob={() => {}} />
      </div>
      <div className="basis-1/2">
        <JobsList jobs={fetchedJobs?.jobs} />
      </div>
      {/* <Dialog
        onCloseDialog={() => closeDialog("applyToJob")}
        isOpen={dialogs.applyToJob.isOpen}
        render={() => (
          <ApplyToJob jobId={jobId} token={token!} closeDialog={closeDialog} />
        )}
      /> */}
    </section>
  );
};

export default Protected(JobDetailsPage, ["seeker"]);
