"use client";

import React, { useEffect } from "react";
import Protected from "@/components/Hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { EmployersList } from "@/components/Seekers/Employers";
import { useQuery } from "react-query";
import { getEmployers } from "@/utils/actions";
import { Pagination } from "@/components/Shared/Pagination";
import { SearchEmployers } from "@/components/Seekers/Employers/Search";

const Companies = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading, refetch } = useQuery({
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

  let fetchedCompanies: any = data;

  return (
    <section className="flex flex-col gap-7 py-6">
      <div>
        <SearchEmployers />
      </div>
      <div>
        <EmployersList employers={fetchedCompanies?.employers} />
      </div>
      {fetchedCompanies?.employers.length > 0 && (
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
