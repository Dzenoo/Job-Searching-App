"use client";

import Protected from "@/components/Hoc/Protected";
import { EventsList } from "@/components/Seekers/Events";
import { FilterEvents } from "@/components/Seekers/Events/Filters";
import { SearchEvents } from "@/components/Seekers/Events/Search";
import { Pagination } from "@/components/Shared/Pagination";
import { EventsData } from "@/constants/events";
import React from "react";

const Events = () => {
  return (
    <section className="flex gap-7 py-6">
      <div className="basis-full grow flex flex-col gap-6 overflow-auto">
        <div>
          <SearchEvents />
        </div>
        <div>
          <EventsList events={EventsData} />
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
    </section>
  );
};

export default Protected(Events, ["seeker"]);
