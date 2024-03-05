"use client";

import Protected from "@/components/Hoc/Protected";
import { EventsList } from "@/components/Seekers/Events";
import { FilterEvents } from "@/components/Seekers/Events/Filters";
import { SearchEvents } from "@/components/Seekers/Events/Search";
import RegisterEvents from "@/components/Seekers/Events/register";
import { Dialog } from "@/components/Shared/Dialog";
import { Pagination } from "@/components/Shared/Pagination";
import { EventsData } from "@/constants/events";
import useAuthentication from "@/hooks/useAuthentication";
import useDialogs from "@/hooks/useDialogs";
import React from "react";

const Events = ({ searchParams }: { searchParams: { evt: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { openDialog, closeDialog, dialogs } = useDialogs({
    registerForEvent: {
      isOpen: false,
    },
  });

  return (
    <section className="flex gap-7 py-6">
      <div className="basis-full grow flex flex-col gap-6 overflow-auto">
        <div>
          <SearchEvents />
        </div>
        <div>
          <EventsList
            events={EventsData}
            onRegisterEvent={() => openDialog("registerForEvent")}
          />
        </div>
        <div>
          <Pagination
            totalItems={6}
            itemsPerPage={10}
            currentPage={1}
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
          <RegisterEvents eventId={searchParams?.evt} token={token!} />
        )}
      />
    </section>
  );
};

export default Protected(Events, ["seeker"]);
