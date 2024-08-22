"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getJobs } from "@/lib/actions/jobs.actions";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import PopularJobsInfo from "@/components/seekers/jobs/PopularJobsInfo";
import SearchJobs from "@/components/seekers/jobs/Search/SearchJobs";
import FilterJobs from "@/components/seekers/jobs/Filters/FilterJobs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/usePagination";

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});
const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJobs, refetch } = useQuery({
    queryFn: () =>
      getJobs({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        position: searchParams.position || "",
        salaryRange: searchParams.salaryRange || "",
        seniority: searchParams.seniority || "",
        type: searchParams.type || "",
      }),
    queryKey: ["jobs"],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const totalJobs = fetchedJobs?.totalJobs || 0;
  const itemsPerPage = 10;

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: totalJobs,
    itemsPerPage,
    initialPage: Number(searchParams.page) || 1,
  });

  return (
    <section className="flex justify-between gap-[25px] py-6 max-xl:flex-col">
      <div className="basis-1/2">
        <PopularJobsInfo jobs={fetchedJobs?.popularJobs} />
      </div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchJobs />
        </div>
        <div>
          <JobsList jobs={fetchedJobs?.jobs} />
        </div>
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
      <div className="basis-1/2">
        <FilterJobs />
      </div>
    </section>
  );
};

export default Protected(Jobs, ["seeker"]);
