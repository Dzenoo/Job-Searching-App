"use client";

import Protected from "@/components/Hoc/protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerById } from "@/utils/actions";
import React from "react";
import { useQuery } from "react-query";

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: string };
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

  return <section>{fetchedCompany?.employer.name}</section>;
};

export default Protected(CompanyDetails, ["seeker"]);
