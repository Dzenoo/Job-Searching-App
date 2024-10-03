"use client";

import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication";

import { getJobs } from "@/lib/actions/jobs.actions";

import Protected from "@/components/hoc/Protected";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import PopularJobsInfo from "@/components/seekers/jobs/PopularJobsInfo";
import FilterJobs from "@/components/seekers/jobs/filters/FilterJobs";
import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams";

const SearchJobs = dynamic(
  () => import("@/components/seekers/jobs/search/SearchJobs"),
  { ssr: false }
);

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedJobs,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
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
    queryKey: ["jobs", searchParams],
  });

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const totalJobs = fetchedJobs?.totalJobs || 0;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="flex justify-between gap-[25px] py-6 max-xl:flex-col">
      <div className="basis-1/2">
        <PopularJobsInfo jobs={fetchedJobs?.popularJobs} />
      </div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <Suspense fallback={null}>
            <SearchJobs />
          </Suspense>
        </div>
        <div className="xl:hidden">
          <FilterJobs filterCounts={fetchedJobs?.filterCounts!} />
        </div>
        <div>
          <h1 className="text-initial-gray">Total Jobs ({totalJobs})</h1>
        </div>
        <div>
          {isFiltering ? (
            <LoadingJobsSkeleton />
          ) : (
            <JobsList jobs={fetchedJobs?.jobs} />
          )}
        </div>
        <PaginatedList
          onPageChange={(value) => updateSearchParams("page", value.toString())}
          totalItems={totalJobs}
          itemsPerPage={10}
          currentPage={Number(searchParams.page) || 1}
        />
      </div>
      <div className="max-xl:hidden basis-1/2">
        <FilterJobs filterCounts={fetchedJobs?.filterCounts!} />
      </div>
    </section>
  );
};

export default Protected(Jobs, ["seeker"]);
