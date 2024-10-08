"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication";

import { getSeekers } from "@/lib/actions/employers.actions";

import Protected from "@/components/hoc/Protected";
import FilterSeekers from "@/components/employers/seekers/filters/FilterSeekers";

import dynamic from "next/dynamic";
import LoadingSeekers from "@/components/loaders/LoadingSeekers";
import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams";
import SearchSeekers from "@/components/employers/seekers/search/SearchSeekers";

const SeekersList = dynamic(
  () => import("@/components/employers/seekers/SeekersList"),
  {
    loading: () => <LoadingSeekers />,
  }
);

const SeekersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedSeekers,
    refetch,
    isLoading,
    isRefetching,
    isFetching,
  } = useQuery({
    queryFn: () =>
      getSeekers({
        token: token as string,
        page: searchParams.page || "1",
        skills: searchParams.skills || "",
        search: searchParams.query || "",
      }),
    queryKey: ["seekers", searchParams],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const totalSeekers = fetchedSeekers?.totalSeekers || 0;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="p-16 overflow-auto max-lg:px-8 max-sm:px-4 flex gap-[25px] max-xl:flex-col">
      <div className="basis-1/2"></div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchSeekers query={searchParams.query || ""} />
        </div>
        <div className="xl:hidden">
          <FilterSeekers />
        </div>
        <div>
          {isFiltering ? (
            <LoadingSeekers />
          ) : (
            <SeekersList seekers={fetchedSeekers?.seekers || []} />
          )}
        </div>
        <PaginatedList
          onPageChange={(value) => updateSearchParams("page", value.toString())}
          totalItems={totalSeekers}
          itemsPerPage={12}
          currentPage={Number(searchParams.page) || 1}
        />
      </div>
      <div className="max-xl:hidden basis-1/2">
        <FilterSeekers />
      </div>
    </section>
  );
};

export default Protected(SeekersPage, ["employer"]);
