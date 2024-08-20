"use client";

import Protected from "@/components/Hoc/Protected";
import LoadingEventsSkeleton from "@/components/Loaders/LoadingEvents";
import LoadingJobsSkeleton from "@/components/Loaders/LoadingJobsSkeleton";
import LoadingReviewsSkeleton from "@/components/Loaders/LoadingReviews";
import { EmployerDetailsInfo } from "@/components/Seekers/Employers/Details";
import { EmployerFilters } from "@/components/Seekers/Employers/Filters";
import { EmployerType } from "@/components/Seekers/Employers/Filters/types";
import RegisterEvents from "@/components/Seekers/Events/register";
import { Dialog } from "@/components/Shared/Dialog";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import { getEmployerById } from "@/lib/actions/seekers";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const EventsList = dynamic(
  () => import("@/components/Seekers/Events").then((mod) => mod.EventsList),
  {
    loading: () => <LoadingEventsSkeleton />,
  }
);
const ReviewsList = dynamic(
  () =>
    import("@/components/Seekers/Employers/Details/Reviews").then(
      (mod) => mod.ReviewsList
    ),
  {
    loading: () => <LoadingReviewsSkeleton />,
  }
);
const JobsList = dynamic(
  () => import("@/components/Seekers/Jobs").then((mod) => mod.JobsList),
  {
    loading: () => <LoadingJobsSkeleton />,
  }
);

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: keyof typeof EmployerType };
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
    queryKey: ["company"],
  });
  const { openDialog, closeDialog, dialogs } = useDialogs({
    registerForEvent: {
      isOpen: false,
    },
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
              onRegisterEvent={() => openDialog("registerForEvent")}
            />
            <Dialog
              showCloseButton
              onCloseDialog={() => closeDialog("registerForEvent")}
              isOpen={dialogs.registerForEvent.isOpen}
              render={() => (
                <RegisterEvents
                  eventId={searchParams?.evt}
                  token={token!}
                  closeDialog={closeDialog}
                />
              )}
            />
          </>
        )}
        {searchParamsReviews && (
          <ReviewsList reviews={fetchedCompany?.employer.reviews} />
        )}
        {totalItems > 0 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={10}
            currentPage={Number(searchParams?.page) || 1}
            visiblePages={6}
          />
        )}
      </div>
    </section>
  );
};

export default Protected(CompanyDetails, ["seeker"]);
