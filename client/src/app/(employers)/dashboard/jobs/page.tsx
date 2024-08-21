"use client";

import DashboardEmployerJobs from "@/components/employers/dashboard/jobs/DashboardEmployerJobs";
import SearchJobs from "@/components/employers/dashboard/jobs/search/SearchJobs";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerProfile } from "@/lib/actions/employers.actions";
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
  const { updateSearchParams } = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateSearchParams("page", page.toString());
  };

  const totalJobs = fetchedEmployer?.counts.totalJobs || 0;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-base-black">Jobs</h1>
          <p className="text-initial-gray">
            Easily edit, update, or remove listings to find the perfect
            candidates
          </p>
        </div>
        <SearchJobs />
      </div>
      <DashboardEmployerJobs
        jobs={fetchedEmployer?.employer.jobs || []}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
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
    </section>
  );
};

export default Protected(DashboardJobsPage, ["employer"]);
