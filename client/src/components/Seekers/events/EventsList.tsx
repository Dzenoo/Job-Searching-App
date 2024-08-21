import React from "react";
import { EventTypes } from "@/types";
import EventItem from "./EventItem";

type EventsListProps = {
  events: EventTypes[];
  onRegisterEvent?: () => void;
};

const EventsList: React.FC<EventsListProps> = ({ events, onRegisterEvent }) => {
  return (
    <div>
      <div>
        {events?.length === 0 && (
          <div>
            <h1 className="text-initial-gray text-center py-6">
              Ops! Looks like there are no events founded
            </h1>
          </div>
        )}
        <ul className="grid gap-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {events?.length > 0 &&
            events?.map((event) => (
              <EventItem
                event={event}
                onRegisterEvent={onRegisterEvent!}
                key={event._id}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsList;
