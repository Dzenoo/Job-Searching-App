"use client";

import Protected from "@/components/Hoc/protected";
import { EmployerDetailsInfo } from "@/components/Root/Seekers/Employers/Details";
import { EmployerFilters } from "@/components/Root/Seekers/Employers/Filters";
import { EmployerType } from "@/components/Root/Seekers/Employers/Filters/types";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import LoadingJobsSkeleton from "@/components/Root/Seekers/Jobs/LoadingJobsSkeleton";
import { Pagination } from "@/components/shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
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
      <div className="flex flex-col gap-6 justify-center">
        {searchParamsJobs && (
          <>
            {isLoading ? (
              <LoadingJobsSkeleton />
            ) : (
              <JobsList jobs={fetchedCompany?.employer?.jobs} />
            )}
          </>
        )}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={10}
          currentPage={Number(searchParams?.page) || 1}
          visiblePages={6}
        />
      </div>
    </section>
  );
};

export default Protected(CompanyDetails, ["seeker"]);
