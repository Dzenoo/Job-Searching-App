"use client";

import React, { Suspense, useEffect } from "react";
import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { FilterJobs } from "@/components/Root/Seekers/Jobs/Filters";
import { SearchJobs } from "@/components/Root/Seekers/Jobs/Search";
import { Pagination } from "@/components/shared/Pagination";
import { PopularJobsInfo } from "@/components/Root/Seekers/Jobs/popular";
import { useQuery } from "react-query";
import { getJobs } from "@/utils/actions";

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      getJobs({
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

  let fetchedJobs: any = data;

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
          <Suspense fallback={<div>LOADING</div>}>
            <JobsList jobs={fetchedJobs?.jobs} />
          </Suspense>
        </div>
        {fetchedJobs?.jobs.length > 0 && (
          <div className="py-6">
            <Pagination
              totalItems={fetchedJobs.totalJobs}
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
