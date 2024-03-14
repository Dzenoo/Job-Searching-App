"use client";

import Protected from "@/components/Hoc/Protected";
import { SeekerProfileInformation } from "@/components/Seekers/Profile";
import { SeekerProfileNavigation } from "@/components/Seekers/Profile/Navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { getSeekerProfile } from "@/utils/actions";
import React from "react";
import { useQuery } from "react-query";

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { typings: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading } = useQuery({
    queryFn: () => getSeekerProfile(token as string),
    queryKey: ["profile"],
  });
  const fetchedSeekerProfile: any = data;

  return (
    <section className="flex gap-7 justify-between flex-col mx-40 py-6">
      <div>
        <SeekerProfileNavigation />
      </div>
      {!searchParams.typings && (
        <div>
          <SeekerProfileInformation
            seeker={fetchedSeekerProfile?.seeker}
            token={token!}
          />
        </div>
      )}
      {searchParams.typings === "alerts" && <div>Alerts</div>}
      {searchParams.typings === "saved" && <div>Saved</div>}
      {searchParams.typings === "applications" && <div>Applications</div>}
    </section>
  );
};

export default Protected(SeekerProfilePage, ["seeker"]);
