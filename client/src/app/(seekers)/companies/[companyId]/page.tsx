"use client";

import Protected from "@/components/Hoc/protected";
import { EmployerDetailsInfo } from "@/components/Root/Seekers/Employers/Details";
import { EmployerFilters } from "@/components/Root/Seekers/Employers/Filters";
import { EmployerType } from "@/components/Root/Seekers/Employers/Filters/types";
import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerById } from "@/utils/actions";
import React from "react";
import { useQuery } from "react-query";

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: keyof typeof EmployerType };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getEmployerById(
        params.companyId,
        token as string,
        searchParams.type,
        searchParams.page
      ),
    queryKey: ["company"],
  });

  const fetchedCompany: any = data;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="py-6 overflow-hidden mx-40">
      <div>
        <EmployerDetailsInfo employer={fetchedCompany?.employer} />
      </div>
      <div>
        <EmployerFilters type={searchParams.type} />
      </div>
    </section>
  );
};

export default Protected(CompanyDetails, ["seeker"]);
