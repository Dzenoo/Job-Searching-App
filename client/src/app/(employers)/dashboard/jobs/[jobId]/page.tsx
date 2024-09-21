"use client";

import React from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import useSearchParams from "@/hooks/defaults/useSearchParams";

import { getApplications } from "@/lib/actions/jobs.actions";

import FilterApplications from "@/components/employers/dashboard/jobs/applications/FilterApplications";
import Protected from "@/components/hoc/Protected";
import dynamic from "next/dynamic";
import LoadingJobApplications from "@/components/loaders/LoadingJobApplications";

import PaginatedList from "@/components/ui/paginate-list";

const Applications = dynamic(
  () =>
    import("@/components/employers/dashboard/jobs/applications/Applications"),
  {
    loading: () => <LoadingJobApplications />,
  }
);

const JobApplicationsPage = ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { jobId: string };
}) => {
  const { updateSearchParams } = useSearchParams();
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

  const totalApplications = data?.totalApplications || 0;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

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
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams("page", value.toString())
            }
            totalItems={totalApplications}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Protected(JobApplicationsPage, ["employer"]);
