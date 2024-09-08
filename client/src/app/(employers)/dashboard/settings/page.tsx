"use client";

import React from "react";
import Protected from "@/components/hoc/Protected";
import EmployerProfileInformation from "@/components/employers/dashboard/settings/EmployerProfileInformation";
import useAuthentication from "@/hooks/useAuthentication";
import useGetEmployer from "@/hooks/mutations/useGetEmployer";

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

export default Protected(SettingsPage, ["employer"]);
