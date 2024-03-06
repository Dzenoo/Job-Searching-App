"use client";

import Protected from "@/components/Hoc/Protected";
import { EmployerDetailsInfo } from "@/components/Seekers/Employers/Details";
import { EmployerFilters } from "@/components/Seekers/Employers/Filters";
import { EmployerType } from "@/components/Seekers/Employers/Filters/types";
import { EventsList } from "@/components/Seekers/Events";
import RegisterEvents from "@/components/Seekers/Events/register";
import { JobsList } from "@/components/Seekers/Jobs";
import LoadingJobsSkeleton from "@/components/Seekers/Jobs/LoadingJobsSkeleton";
import { Dialog } from "@/components/Shared/Dialog";
import { Pagination } from "@/components/Shared/Pagination";
import { EventsData } from "@/constants/events";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import { getEmployerById } from "@/utils/actions";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: keyof typeof EmployerType };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading, refetch } = useQuery({
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

  const fetchedCompany: any = data;

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
    <section className="py-6 overflow-hidden mx-40">
      <div>
        <EmployerDetailsInfo employer={fetchedCompany?.employer} />
      </div>
      <div>
        <EmployerFilters type={searchParams.typeEmp} />
      </div>
      <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
        {searchParamsJobs && (
          <>
            {isLoading ? (
              <LoadingJobsSkeleton />
            ) : (
              <JobsList jobs={fetchedCompany?.employer?.jobs} />
            )}
          </>
        )}
        {searchParamsEvents && (
          <>
            {isLoading ? (
              "Events are loading"
            ) : (
              <EventsList
                events={EventsData}
                onRegisterEvent={() => openDialog("registerForEvent")}
              />
            )}
            <Dialog
              onCloseDialog={() => closeDialog("registerForEvent")}
              isOpen={dialogs.registerForEvent.isOpen}
              render={() => (
                <RegisterEvents eventId={searchParams?.evt} token={token!} />
              )}
            />
          </>
        )}
        {searchParamsReviews && (
          <>{isLoading ? "Reviews are loading" : "Reviews"}</>
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
