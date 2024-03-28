"use client";

import { SeekersList } from "@/components/Employers/Seekers";
import { FilterSeekers } from "@/components/Employers/Seekers/Filters";
import { SearchSeekers } from "@/components/Employers/Seekers/Search";
import Protected from "@/components/Hoc/Protected";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import { getSeekers } from "@/utils/actions/employers";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

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

  return (
    <section className="p-16 overflow-auto max-lg:px-8 max-sm:px-4 flex gap-[10px] max-xl:flex-col">
      <div className="basis-1/2"></div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchSeekers />
        </div>
        <div>
          <SeekersList seekers={fetchedSeekers?.seekers || []} />
        </div>
        {fetchedSeekers && fetchedSeekers?.seekers.length > 0 && (
          <div className="py-6">
            <Pagination
              totalItems={fetchedSeekers?.totalSeekers}
              itemsPerPage={10}
              currentPage={Number(searchParams?.page) || 1}
              visiblePages={6}
            />
          </div>
        )}
      </div>
      <div className="basis-1/2">
        <FilterSeekers />
      </div>
    </section>
  );
};

export default Protected(SeekersPage, ["employer"]);
