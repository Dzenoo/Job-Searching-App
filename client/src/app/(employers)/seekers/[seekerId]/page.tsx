"use client";

import { SeekerDetailsInfo } from "@/components/Employers/Seekers/Details";
import Protected from "@/components/hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getSeekerById } from "@/lib/actions/employers.actions";
import React from "react";
import { useQuery } from "react-query";

const SeekerDetailsPage = ({
  params: { seekerId },
}: {
  params: { seekerId: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeeker, isLoading } = useQuery({
    queryFn: () => getSeekerById(seekerId, token as string),
    queryKey: ["seeker", { seekerId }],
  });

  return (
    <section className="p-16 overflow-auto max-lg:px-8 max-sm:px-4 flex gap-[10px] max-xl:flex-col">
      <div className="basis-full grow flex flex-col gap-6">
        <SeekerDetailsInfo seeker={fetchedSeeker?.seeker!} />
      </div>
    </section>
  );
};

export default Protected(SeekerDetailsPage, ["employer"]);
