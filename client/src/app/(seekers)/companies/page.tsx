"use client";

import React, { useEffect } from "react";
import Protected from "@/components/Hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { useQuery } from "react-query";
import { Pagination } from "@/components/Shared/Pagination";
import { SearchEmployers } from "@/components/Seekers/Employers/Search";
import { getEmployers } from "@/utils/actions/seekers";
import LoadingCompaniesSkeleton from "@/components/Loaders/LoadingCompanies";
import dynamic from "next/dynamic";

const EmployersList = dynamic(
  () =>
    import("@/components/Seekers/Employers").then((mod) => mod.EmployersList),
  {
    loading: () => <LoadingCompaniesSkeleton />,
  }
);

const Companies = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedCompanies, refetch } = useQuery({
    queryFn: () =>
      getEmployers({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
      }),
    queryKey: ["companies"],
  });
  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <section className="flex flex-col gap-7 py-6">
      <div>
        <SearchEmployers />
      </div>
      <div>
        <EmployersList employers={fetchedCompanies?.employers} />
      </div>
      {fetchedCompanies && fetchedCompanies?.employers.length > 0 && (
        <div className="py-6">
          <Pagination
            totalItems={fetchedCompanies?.totalEmployers}
            itemsPerPage={10}
            currentPage={Number(searchParams?.page) || 1}
            visiblePages={6}
          />
        </div>
      )}
    </section>
  );
};

export default Protected(Companies, ["seeker"]);
