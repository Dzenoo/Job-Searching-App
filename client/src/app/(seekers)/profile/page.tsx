"use client";

import Protected from "@/components/hoc/Protected";
import LoadingApplicationsSkeleton from "@/components/loaders/LoadingApplications";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingSeekersInformationsSkeleton from "@/components/loaders/LoadingSeekersInformations";
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

const SeekerProfileInformation = dynamic(
  () =>
    import("@/components/Seekers/Profile").then(
      (mod) => mod.SeekerProfileInformation
    ),
  {
    loading: () => <LoadingSeekersInformationsSkeleton />,
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
    <section className="flex justify-between gap-[10px] flex-col mx-40 py-6 max-xl:mx-0">
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
