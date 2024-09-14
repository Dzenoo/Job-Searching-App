"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";

import { getSeekers } from "@/lib/actions/employers.actions";

import usePagination from "@/hooks/usePagination";
import Protected from "@/components/hoc/Protected";
import FilterSeekers from "@/components/employers/seekers/filters/FilterSeekers";
import SearchSeekers from "@/components/employers/seekers/search/SearchSeekers";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import dynamic from "next/dynamic";
import LoadingSeekers from "@/components/tempname/LoadingSeekers";

const SeekersList = dynamic(
  () => import("@/components/employers/seekers/SeekersList"),
  {
    loading: () => <LoadingSeekers />,
  }
);

const SeekersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeekers, refetch } = useQuery({
    queryFn: () =>
      getSeekers({
        token: token as string,
        page: searchParams.page || "1",
        skills: searchParams.skills || "",
        search: searchParams.query || "",
      }),
    queryKey: ["seekers"],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: fetchedSeekers?.totalSeekers || 0,
    itemsPerPage: 10,
    initialPage: Number(searchParams.page) || 1,
  });

  return (
    <section className="p-16 overflow-auto max-lg:px-8 max-sm:px-4 flex gap-[10px] max-xl:flex-col">
      <div className="basis-1/2"></div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchSeekers />
        </div>
        <div className="xl:hidden">
          <FilterSeekers />
        </div>
        <div>
          <SeekersList seekers={fetchedSeekers?.seekers || []} />
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
      <div className="max-xl:hidden basis-1/2">
        <FilterSeekers />
      </div>
    </section>
  );
};

export default Protected(SeekersPage, ["employer"]);
