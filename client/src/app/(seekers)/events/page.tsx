"use client";

import Protected from "@/components/Hoc/Protected";
import LoadingEventsSkeleton from "@/components/Loaders/LoadingEvents";
import { FilterEvents } from "@/components/Seekers/Events/Filters";
import { SearchEvents } from "@/components/Seekers/Events/Search";
import RegisterEvents from "@/components/Seekers/Events/register";
import { Dialog } from "@/components/Shared/Dialog";
import { Pagination } from "@/components/Shared/Pagination";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import { getEvents } from "@/lib/actions/events";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const EventsList = dynamic(
  () => import("@/components/Seekers/Events").then((mod) => mod.EventsList),
  {
    loading: () => <LoadingEventsSkeleton />,
  }
);

const Events = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { openDialog, closeDialog, dialogs } = useDialogs({
    registerForEvent: {
      isOpen: false,
    },
  });
  const { data: fetchedEvents, refetch } = useQuery({
    queryFn: () =>
      getEvents({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        category: searchParams.category || "",
        location: searchParams.location || "",
      }),
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <section className="flex  py-6 gap-[10px] max-xl:flex-col">
      <div className="basis-full grow flex flex-col gap-6 overflow-auto">
        <div>
          <SearchEvents />
        </div>
        <div>
          <EventsList
            events={fetchedEvents?.events || []}
            onRegisterEvent={() => openDialog("registerForEvent")}
          />
        </div>
        <div>
          <Pagination
            totalItems={fetchedEvents?.totalEvents || 0}
            itemsPerPage={10}
            currentPage={Number(searchParams?.page) || 1}
            visiblePages={6}
          />
        </div>
      </div>
      <div className="basis-[36em]">
        <FilterEvents />
      </div>
      <Dialog
        onCloseDialog={() => closeDialog("registerForEvent")}
        isOpen={dialogs.registerForEvent.isOpen}
        render={() => (
          <RegisterEvents
            eventId={searchParams?.evt}
            token={token!}
            closeDialog={closeDialog}
          />
        )}
      />
    </section>
  );
};

export default Protected(Events, ["seeker"]);
