"use client";

import { Applications } from "@/components/Employers/Dashboard/Jobs/Applications";
import { FilterApplications } from "@/components/Employers/Dashboard/Jobs/Applications/Filter";
import Protected from "@/components/hoc/Protected";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import { getApplications } from "@/lib/actions/jobs.actions";
import React from "react";
import { useQuery } from "react-query";

const JobApplicationsPage = ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { jobId: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data } = useQuery(
    ["applications", params.jobId, searchParams.page, searchParams.type],
    () =>
      getApplications({
        token: token!,
        jobId: params.jobId,
        page: searchParams?.page || "1",
        type: searchParams.type || "",
      })
  );

  return (
    <section className="flex flex-col gap-3">
      <div>
        <div>
          <h1 className="text-base-black">{data?.job.title}</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            Manage your applications to find the perfect candidates for this job
          </p>
        </div>
      </div>
      <div>
        <FilterApplications
          applicants={data?.totalApplications || 0}
          pending={data?.totalPendingStatus || 0}
          interviews={data?.totalInterviewStatus || 0}
        />
      </div>
      <div>
        <Applications
          applications={data?.applications || []}
          currentPage={1}
          itemsPerPage={10}
        />
      </div>
      {data?.applications.length !== 0 && (
        <div>
          <Pagination
            totalItems={data?.totalApplications || 0}
            itemsPerPage={10}
            currentPage={Number(searchParams?.page) || 1}
            visiblePages={6}
          />
        </div>
      )}
    </section>
  );
};

export default Protected(JobApplicationsPage, ["employer"]);
