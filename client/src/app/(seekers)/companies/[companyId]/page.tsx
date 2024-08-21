"use client";

import Protected from "@/components/hoc/Protected";
import LoadingEventsSkeleton from "@/components/loaders/LoadingEvents";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingReviewsSkeleton from "@/components/loaders/LoadingReviews";
import EmployerDetailsInfo from "@/components/seekers/employers/details/EmployerDetailsInfo";
import EmployerFilters from "@/components/seekers/employers/filters/EmployerFilters";
import RegisterEvents from "@/components/seekers/events/RegisterEvents";
import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerById } from "@/lib/actions/seekers.actions";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import usePagination from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const EventsList = dynamic(
  () => import("@/components/seekers/events/EventsList"),
  {
    loading: () => <LoadingEventsSkeleton />,
  }
);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  const searchParamsEvents = searchParams?.typeEmp === "events";

  let totalItems = 0;
  if (searchParamsJobs && fetchedCompany?.totalJobs) {
    totalItems = fetchedCompany?.totalJobs;
  } else if (searchParamsReviews && fetchedCompany?.totalReviews) {
    totalItems = fetchedCompany?.totalReviews;
  } else if (searchParamsEvents && fetchedCompany?.totalEvents) {
    totalItems = fetchedCompany?.totalEvents;
  }

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems,
    itemsPerPage: 10,
    initialPage: Number(searchParams?.page) || 1,
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

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
        {searchParamsEvents && (
          <>
            <EventsList
              events={fetchedCompany?.employer.events || []}
              onRegisterEvent={openDialog}
            />
            <Dialog open={isDialogOpen}>
              <DialogHeader>
                <DialogTitle>Register for Event</DialogTitle>
              </DialogHeader>
              <DialogContent>
                <RegisterEvents
                  eventId={searchParams?.evt}
                  token={token!}
                  closeDialog={closeDialog}
                />
              </DialogContent>
              <DialogFooter>
                <Button variant="default" onClick={closeDialog}>
                  Close
                </Button>
              </DialogFooter>
            </Dialog>
          </>
        )}
        {searchParamsReviews && (
          <ReviewsList reviews={fetchedCompany?.employer.reviews} />
        )}
        {totalItems > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default Protected(CompanyDetails, ["seeker"]);
