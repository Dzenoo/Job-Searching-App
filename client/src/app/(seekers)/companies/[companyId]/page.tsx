"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/useAuthentication";
import usePagination from "@/hooks/usePagination";

import { getEmployerById } from "@/lib/actions/seekers.actions";

import Protected from "@/components/tempname/Protected";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingReviewsSkeleton from "@/components/loaders/LoadingReviews";
import EmployerDetailsInfo from "@/components/seekers/employers/details/EmployerDetailsInfo";
import EmployerFilters from "@/components/seekers/employers/filters/EmployerFilters";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const ReviewsList = dynamic(
  () => import("@/components/seekers/employers/details/reviews/ReviewsList"),
  {
    loading: () => <LoadingReviewsSkeleton />,
  }
);
const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: any };
}) => {
  const { token } = useAuthentication().getCookieHandler();

  const { data: fetchedCompany, refetch } = useQuery({
    queryFn: () =>
      getEmployerById(
        params.companyId,
        token as string,
        searchParams.typeEmp,
        searchParams.page
      ),
    queryKey: [
      "company",
      params.companyId,
      searchParams.typeEmp,
      searchParams.page,
    ],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const searchParamsJobs = searchParams?.typeEmp === "jobs";
  const searchParamsReviews = searchParams?.typeEmp === "reviews";

  let totalItems = 0;
  if (searchParamsJobs && fetchedCompany?.totalJobs) {
    totalItems = fetchedCompany?.totalJobs;
  } else if (searchParamsReviews && fetchedCompany?.totalReviews) {
    totalItems = fetchedCompany?.totalReviews;
  }

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems,
    itemsPerPage: 10,
    initialPage: Number(searchParams?.page) || 1,
  });

  return (
    <section className="py-6 overflow-hidden mx-40 max-xl:mx-0">
      <div>
        <EmployerDetailsInfo employer={fetchedCompany?.employer!} />
      </div>
      <div>
        <EmployerFilters type={searchParams.typeEmp} />
      </div>
      <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
        {searchParamsJobs && <JobsList jobs={fetchedCompany?.employer?.jobs} />}
        {searchParamsReviews && (
          <ReviewsList reviews={fetchedCompany?.employer.reviews} />
        )}
        {totalItems > 0 && (
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
      </div>
    </section>
  );
};

export default Protected(CompanyDetails, ["seeker"]);
