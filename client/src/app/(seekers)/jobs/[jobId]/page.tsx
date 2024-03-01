"use client";

import Protected from "@/components/Hoc/protected";
import AddJobAlert from "@/components/Root/Seekers/Jobs/Details/alerts";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { JobDetailsInfo } from "@/components/Root/Seekers/Jobs/Details";
import { getJobById } from "@/utils/actions";
import { useQuery } from "react-query";
import { Dialog } from "@/components/shared/Dialog";
import ApplyToJob from "@/components/Root/Seekers/Jobs/Details/apply";

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
  const { data, isLoading } = useQuery({
    queryFn: () => getJobById(jobId, token as string),
    queryKey: ["job"],
  });
  let fetchedJobs: any = data;

  return (
    <section className="flex gap-7 py-6 justify-between">
      <div className="basis-[38em]">
        <AddJobAlert />
      </div>
      <div className="basis-full grow">
        <JobDetailsInfo
          job={fetchedJobs?.job}
          onApplyJob={() => openDialog("applyToJob")}
        />
      </div>
      <div className="basis-1/2">
        <JobsList jobs={fetchedJobs?.jobs} />
      </div>
      <div>
        <Dialog
          onCloseDialog={() => closeDialog("applyToJob")}
          isOpen={dialogs.applyToJob.isOpen}
          render={() => <ApplyToJob jobId={jobId} token={token!} />}
        />
      </div>
    </section>
  );
};

export default Protected(JobDetailsPage, ["seeker"]);
