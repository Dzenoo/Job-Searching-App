"use client";

import Applications from "@/components/employers/dashboard/jobs/applications/Applications";
import FilterApplications from "@/components/employers/dashboard/jobs/applications/FilterApplications";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getApplications } from "@/lib/actions/jobs.actions";
import React from "react";
import { useQuery } from "react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import useSearchParams from "@/hooks/useSearchParams";

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
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                ) : (
                  <PaginationPrevious href="#" isActive={false} />
                )}
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
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
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                ) : (
                  <PaginationNext href="#" isActive={false} />
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