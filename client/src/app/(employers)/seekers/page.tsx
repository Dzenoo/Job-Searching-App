"use client";

import { SeekersList } from "@/components/Employers/Seekers";
import Protected from "@/components/Hoc/Protected";
import useAuthentication from "@/hooks/useAuthentication";
import { getSeekers } from "@/utils/actions/employers";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const SeekersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeekers, refetch } = useQuery({
    queryFn: () =>
      getSeekers({
        token: token as string,
        page: searchParams.page || "1",
        skills: searchParams.skills || "",
        search: searchParams.query || "",
      }),
    queryKey: ["seekers"],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <section className="flex gap-3 overflow-auto max-xl:flex-col">
      <div className="basis-1/2">div</div>
      <div className="basis-full grow">
        <div>
          <SeekersList seekers={fetchedSeekers?.seekers || []} />
        </div>
      </div>
      <div className="basis-1/2">div</div>
    </section>
  );
};

export default Protected(SeekersPage, ["employer"]);
