"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";
import usePagination from "@/hooks/usePagination";

import { getEmployers } from "@/lib/actions/seekers.actions";

import Protected from "@/components/hoc/Protected";
import LoadingCompaniesSkeleton from "@/components/tempname/LoadingCompanies";
import SearchEmployers from "@/components/seekers/employers/search/SearchEmployers";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const EmployersList = dynamic(
  () => import("@/components/seekers/employers/EmployersList"),
  {
    loading: () => <LoadingCompaniesSkeleton />,
  }
);

const Companies = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedCompanies, refetch } = useQuery({
    queryFn: () =>
      getEmployers({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
      }),
    queryKey: ["companies"],
  });
  useEffect(() => {
    refetch();
  }, [searchParams]);

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: fetchedCompanies?.totalEmployers!,
    itemsPerPage: 10,
    initialPage: Number(searchParams?.page) || 1,
  });

  return (
    <section className="flex flex-col gap-[10px] py-6">
      <div>
        <SearchEmployers />
      </div>
      <div>
        <EmployersList employers={fetchedCompanies?.employers} />
      </div>
      {fetchedCompanies && fetchedCompanies?.employers.length > 0 && (
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
      )}
    </section>
  );
};

export default Protected(Companies, ["seeker"]);
