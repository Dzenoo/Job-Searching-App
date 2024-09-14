"use client";

import React from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";
import useSearchParams from "@/hooks/useSearchParams";
import usePagination from "@/hooks/usePagination";

import { getEmployerProfile } from "@/lib/actions/employers.actions";

import Protected from "@/components/tempname/Protected";
import dynamic from "next/dynamic";
import SearchJobs from "@/components/employers/dashboard/jobs/search/SearchJobs";
import LoadingDashboardJobs from "@/components/loaders/LoadingDashboardJobs";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const DashboardEmployerJobs = dynamic(
  () => import("@/components/employers/dashboard/jobs/DashboardEmployerJobs"),
  {
    loading: () => <LoadingDashboardJobs />,
  }
);

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

  const totalJobs = fetchedEmployer?.counts.totalJobs || 0;
  const itemsPerPage = 10;

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: totalJobs,
    itemsPerPage,
    initialPage: Number(searchParams.page) || 1,
  });

  React.useEffect(() => {
    updateSearchParams("page", currentPage.toString());
  }, [currentPage, updateSearchParams]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between gap-3 max-xl:flex-col xl:items-center">
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
    </section>
  );
};

export default Protected(DashboardJobsPage, ["employer"]);
