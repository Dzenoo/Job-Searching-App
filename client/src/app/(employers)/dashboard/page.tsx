"use client";

import Followers from "@/components/Employers/Dashboard/Overview/Charts/Followers";
import JobsPerMonth from "@/components/Employers/Dashboard/Overview/Charts/JobsPerMonth";
import Types from "@/components/Employers/Dashboard/Overview/Charts/Types";
import { Statistics } from "@/components/Employers/Dashboard/Overview/Statistics";
import Protected from "@/components/Hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import useGetEmployer from "@/hooks/useGetEmployer";
import { getEmployerAnalytics } from "@/utils/actions/employers";
import React from "react";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: analytics } = useQuery({
    queryFn: () => getEmployerAnalytics(token as string),
    queryKey: ["analytics"],
  });
  const { data: fetchedEmployer } = useGetEmployer();

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-[3px]">
        <div>
          <h1 className="text-base-black">
            Hi There, {fetchedEmployer?.employer.name}
          </h1>
        </div>
        <div>
          <p className="text-initial-gray">Gain Valuable Insights</p>
        </div>
      </div>
      <div>
        <Statistics
          totalJobs={analytics?.totalJobs || 0}
          totalEvents={analytics?.totalEvents || 0}
          totalReviews={analytics?.totalReviews || 0}
          totalApplications={analytics?.totalApplications || 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-3">
        <div>
          <JobsPerMonth data={analytics?.jobsPerMonth} />
        </div>
        <div>
          <Followers data={analytics?.followersOverTime} />
        </div>
        <div>
          <Types data={analytics?.jobTypes} />
        </div>
      </div>
    </section>
  );
};

export default Protected(Dashboard, ["employer"]);
