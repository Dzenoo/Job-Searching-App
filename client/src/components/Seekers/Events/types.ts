import { EventTypes } from "@/typings/events";

type EventsListProps = {
  events: EventTypes[];
  onRegisterEvent?: () => void;
};

export { type EventsListProps };
