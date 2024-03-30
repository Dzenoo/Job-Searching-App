"use client";

import { Statistics } from "@/components/Employers/Dashboard/Overview/Statistics";
import Protected from "@/components/Hoc/Protected";
import useGetEmployer from "@/hooks/useGetEmployer";
import React from "react";

const Dashboard = () => {
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
          totalJobs={fetchedEmployer?.totalJobsData || 0}
          totalEvents={fetchedEmployer?.totalEventsData || 0}
          totalReviews={fetchedEmployer?.totalReviewsData || 0}
          totalApplications={fetchedEmployer?.totalApplications || 0}
        />
      </div>
    </section>
  );
};

export default Protected(Dashboard, ["employer"]);
