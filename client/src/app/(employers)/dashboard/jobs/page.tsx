"use client";

import { DashboardEmployerJobs } from "@/components/Employers/Dashboard/Jobs";
import { SearchJobs } from "@/components/Employers/Dashboard/Jobs/Search";
import Protected from "@/components/Hoc/Protected";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import {
  getEmployerAnalytics,
  getEmployerProfile,
} from "@/utils/actions/employers";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const DashboardJobsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: analytics } = useQuery({
    queryFn: () => getEmployerAnalytics(token as string),
    queryKey: ["analytics"],
  });
  const { data: fetchedEmployer, refetch } = useQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        type: "jobs",
      }),
    queryKey: ["jobs"],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div>
            <h1 className="text-base-black">Jobs</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              Easily edit, update, or remove listings to find the perfect
              candidates
            </p>
          </div>
        </div>
        {fetchedEmployer?.employer.jobs.length !== 0 && (
          <div>
            <SearchJobs />
          </div>
        )}
      </div>
      <div>
        <DashboardEmployerJobs
          jobs={fetchedEmployer?.employer.jobs || []}
          currentPage={Number(searchParams?.page) || 1}
          itemsPerPage={10}
        />
      </div>
      <div>
        <Pagination
          totalItems={analytics?.totalJobs || 0}
          itemsPerPage={10}
          currentPage={Number(searchParams?.page) || 1}
          visiblePages={6}
        />
      </div>
    </section>
  );
};

export default Protected(DashboardJobsPage, ["employer"]);
