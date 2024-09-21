"use client";

import Followers from "@/components/employers/dashboard/overview/Followers";
import JobsPerMonth from "@/components/employers/dashboard/overview/JobsPerMonth";
import Statistics from "@/components/employers/dashboard/overview/Statistics";
import Types from "@/components/employers/dashboard/overview/Types";
import Protected from "@/components/hoc/Protected";
import useGetEmployer from "@/hooks/mutations/useGetEmployer";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import { getEmployerAnalytics } from "@/lib/actions/employers.actions";
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
          totalReviews={analytics?.totalReviews || 0}
          totalApplications={analytics?.totalApplications || 0}
          totalFollowers={analytics?.totalFollowers || 0}
          jobsThisMonth={analytics?.jobsThisMonth || 0}
          reviewsThisMonth={analytics?.reviewsThisMonth || 0}
          applicationsThisMonth={analytics?.applicationsThisMonth || 0}
          followersThisMonth={analytics?.followersThisMonth || 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
      <div></div>
    </section>
  );
};

export default Protected(Dashboard, ["employer"]);
