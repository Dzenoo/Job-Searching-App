"use client";

import Protected from "@/components/Hoc/protected";
import { EventsList } from "@/components/Root/Seekers/Events";
import { FilterEvents } from "@/components/Root/Seekers/Events/Filters";
import { SearchEvents } from "@/components/Root/Seekers/Events/Search";
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
