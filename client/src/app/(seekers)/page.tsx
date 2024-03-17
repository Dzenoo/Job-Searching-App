"use client";

import React, { useEffect } from "react";
import { JobsList } from "@/components/Seekers/Jobs";
import { FilterJobs } from "@/components/Seekers/Jobs/Filters";
import { SearchJobs } from "@/components/Seekers/Jobs/Search";
import { Pagination } from "@/components/Shared/Pagination";
import { PopularJobsInfo } from "@/components/Seekers/Jobs/popular";
import { useQuery } from "react-query";
import Protected from "@/components/Hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getJobs } from "@/utils/actions/jobs";
import LoadingJobsSkeleton from "@/components/Loaders/LoadingJobsSkeleton";

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedJobs,
    isLoading,
    refetch,
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
    queryKey: ["jobs"],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <section className="flex gap-7 justify-between py-6">
      <div className="basis-1/2">
        <PopularJobsInfo jobs={fetchedJobs?.popularJobs} />
      </div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchJobs />
        </div>
        <div>
          {isLoading ? (
            <LoadingJobsSkeleton />
          ) : (
            <JobsList jobs={fetchedJobs?.jobs} />
          )}
        </div>
        {fetchedJobs && fetchedJobs?.jobs.length > 0 && (
          <div className="py-6">
            <Pagination
              totalItems={fetchedJobs?.totalJobs}
              itemsPerPage={10}
              currentPage={Number(searchParams?.page) || 1}
              visiblePages={6}
            />
          </div>
        )}
      </div>
      <div className="basis-1/2">
        <FilterJobs />
      </div>
    </section>
  );
};

export default Protected(Jobs, ["seeker"]);
