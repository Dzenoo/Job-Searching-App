"use client";

import { DashboardEmployerJobs } from "@/components/Employers/Dashboard/Jobs";
import { SearchJobs } from "@/components/Employers/Dashboard/Jobs/Search";
import Protected from "@/components/Hoc/Protected";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerProfile } from "@/utils/actions/employers";
import React from "react";
import { useQuery } from "react-query";

const DashboardJobsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedEmployer } = useQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        type: "jobs",
      }),
    queryKey: ["jobs", searchParams],
  });

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
        <div>
          <SearchJobs />
        </div>
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
          totalItems={fetchedEmployer?.counts.totalJobs || 0}
          itemsPerPage={10}
          currentPage={Number(searchParams?.page) || 1}
          visiblePages={6}
        />
      </div>
    </section>
  );
};

export default Protected(DashboardJobsPage, ["employer"]);
