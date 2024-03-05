"use client";

import Protected from "@/components/Hoc/Protected";
import { EventsList } from "@/components/Seekers/Events";
import { FilterEvents } from "@/components/Seekers/Events/Filters";
import { SearchEvents } from "@/components/Seekers/Events/Search";
import React from "react";

const Events = () => {
  return (
    <section className="flex gap-6 py-7">
      <div className="basis-full grow flex flex-col gap-6 overflow-auto">
        <div>
          <SearchEvents />
        </div>
        <div>
          <EventsList />
        </div>
      </div>
      <div className="basis-[36em]">
        <FilterEvents />
      </div>
    </section>
  );
};

export default Protected(Events, ["seeker"]);
