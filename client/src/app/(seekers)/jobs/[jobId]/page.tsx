"use client";

import Protected from "@/components/Hoc/Protected";
import AddJobAlert from "@/components/Seekers/Jobs/Details/alerts";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import ApplyToJob from "@/components/Seekers/Jobs/Details/apply";
import { JobsList } from "@/components/Seekers/Jobs";
import { JobDetailsInfo } from "@/components/Seekers/Jobs/Details";
import { useQuery } from "react-query";
import { Dialog } from "@/components/Shared/Dialog";
import { getJobById } from "@/utils/actions/jobs";
import LoadingJobDetails from "@/components/Loaders/LoadingJobDetails";

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const { openDialog, closeDialog, dialogs } = useDialogs({
    applyToJob: {
      isOpen: false,
    },
  });
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
        <JobDetailsInfo
          job={fetchedJobs?.job!}
          onApplyJob={() => openDialog("applyToJob")}
        />
      </div>
      <div className="basis-1/2">
        <JobsList jobs={fetchedJobs?.jobs} />
      </div>
      <Dialog
        onCloseDialog={() => closeDialog("applyToJob")}
        isOpen={dialogs.applyToJob.isOpen}
        render={() => (
          <ApplyToJob jobId={jobId} token={token!} closeDialog={closeDialog} />
        )}
      />
    </section>
  );
};

export default Protected(JobDetailsPage, ["seeker"]);
