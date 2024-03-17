"use client";

import Protected from "@/components/Hoc/Protected";
import LoadingJobsSkeleton from "@/components/Loaders/LoadingJobsSkeleton";
import { JobsList } from "@/components/Seekers/Jobs";
import { SeekerProfileInformation } from "@/components/Seekers/Profile";
import { SeekerProfileNavigation } from "@/components/Seekers/Profile/Navigation";
import useAuthentication from "@/hooks/useAuthentication";
import useGetSeeker from "@/hooks/useGetSeeker";
import React from "react";

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { typings: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data, isLoading } = useGetSeeker();
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
      {searchParams.typings === "saved" && (
        <div>
          {isLoading ? (
            <LoadingJobsSkeleton />
          ) : (
            <JobsList jobs={fetchedSeekerProfile?.seeker?.savedJobs} />
          )}
        </div>
      )}
      {searchParams.typings === "alerts" && <div>Alerts</div>}
      {searchParams.typings === "applications" && <div>Applications</div>}
    </section>
  );
};

export default Protected(SeekerProfilePage, ["seeker"]);
