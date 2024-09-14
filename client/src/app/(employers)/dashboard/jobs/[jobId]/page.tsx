"use client";

import React from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";
import useSearchParams from "@/hooks/useSearchParams";

import { getApplications } from "@/lib/actions/jobs.actions";

import FilterApplications from "@/components/employers/dashboard/jobs/applications/FilterApplications";
import Protected from "@/components/hoc/Protected";
import dynamic from "next/dynamic";
import LoadingJobApplications from "@/components/loaders/LoadingJobApplications";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
  const { updateSearchParams } = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateSearchParams("page", page.toString());
  };

  const totalApplications = data?.totalApplications || 0;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalApplications / itemsPerPage);

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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 ? (
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                ) : (
                  <PaginationPrevious isActive={false} />
                )}
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                {currentPage < totalPages ? (
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                ) : (
                  <PaginationNext isActive={false} />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default Protected(JobApplicationsPage, ["employer"]);
