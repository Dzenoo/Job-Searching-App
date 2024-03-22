"use client";

import Protected from "@/components/Hoc/Protected";
import LoadingApplicationsSkeleton from "@/components/Loaders/LoadingApplications";
import LoadingJobsSkeleton from "@/components/Loaders/LoadingJobsSkeleton";
import { SeekerProfileInformation } from "@/components/Seekers/Profile";
import { SeekerProfileAlerts } from "@/components/Seekers/Profile/Alerts";
import { SeekerProfileNavigation } from "@/components/Seekers/Profile/Navigation";
import useAuthentication from "@/hooks/useAuthentication";
import useGetSeeker from "@/hooks/useGetSeeker";
import dynamic from "next/dynamic";
import React from "react";

const JobsList = dynamic(
  () => import("@/components/Seekers/Jobs").then((mod) => mod.JobsList),
  {
    loading: () => <LoadingJobsSkeleton />,
  }
);

const Applications = dynamic(
  () =>
    import("@/components/Seekers/Profile/Applications").then(
      (mod) => mod.Applications
    ),
  {
    loading: () => <LoadingApplicationsSkeleton />,
  }
);

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { typings: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeekerProfile } = useGetSeeker();

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
          <JobsList jobs={fetchedSeekerProfile?.seeker.savedJobs || []} />
        </div>
      )}
      {searchParams.typings === "alerts" && (
        <div>
          <SeekerProfileAlerts alerts={fetchedSeekerProfile?.seeker.alerts} />
        </div>
      )}
      {searchParams.typings === "applications" && (
        <div>
          <Applications
            applications={fetchedSeekerProfile?.seeker.applications || []}
          />
        </div>
      )}
    </section>
  );
};

export default Protected(SeekerProfilePage, ["seeker"]);
