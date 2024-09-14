"use client";

import React from "react";
import dynamic from "next/dynamic";

import useAuthentication from "@/hooks/useAuthentication";
import useGetSeeker from "@/hooks/mutations/useGetSeeker";

import Protected from "@/components/hoc/Protected";

import LoadingApplicationsSkeleton from "@/components/tempname/LoadingApplications";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingSeekersInformationsSkeleton from "@/components/loaders/LoadingSeekersInformations";

import SeekerProfileAlerts from "@/components/tempname/profile/alerts/NewAlertsForm";
import SeekerProfileNavigation from "@/components/seekers/profile/navigation/SeekerProfileNavigation";

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const Applications = dynamic(
  () => import("@/components/seekers/profile/applications/Applications"),
  {
    loading: () => <LoadingApplicationsSkeleton />,
  }
);

const SeekerProfileInformation = dynamic(
  () => import("@/components/seekers/profile/SeekerProfileInformation"),
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
