"use client";

import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { JobDetailsInfo } from "@/components/Root/Seekers/Jobs/Details";
import useAuthentication from "@/hooks/useAuthentication";
import { getJobById } from "@/utils/actions";
import { useQuery } from "react-query";

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading } = useQuery({
    queryFn: () => getJobById(jobId, token as string),
    queryKey: ["job"],
  });
  let fetchedJobs: any = data;

  return (
    <section className="flex gap-7 py-6 justify-between">
      <div className="basis-[36em]">Alerts</div>
      <div className="basis-full grow">
        <JobDetailsInfo job={fetchedJobs?.job} />
      </div>
      <div className="basis-1/2">
        <JobsList jobs={fetchedJobs?.jobs} />
      </div>
    </section>
  );
};

export default Protected(JobDetailsPage, ["seeker"]);
