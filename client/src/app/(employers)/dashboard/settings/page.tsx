"use client";

import React from "react";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import useGetEmployer from "@/hooks/queries/useGetEmployer";
import dynamic from "next/dynamic";
import LoadingEmployerSettings from "@/components/loaders/LoadingEmployerSettings";

const EmployerProfileInformation = dynamic(
  () =>
    import(
      "@/components/employers/dashboard/settings/EmployerProfileInformation"
    ),
  {
    loading: () => <LoadingEmployerSettings />,
  }
);

const SettingsPage = () => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedEmployerProfile } = useGetEmployer();

  return (
    <div className="flex justify-between gap-[10px] flex-col mx-40 py-6 max-xl:mx-0">
      <EmployerProfileInformation
        token={token!}
        employer={fetchedEmployerProfile?.employer}
      />
    </div>
  );
};

export default SettingsPage;
