import { Event } from "@/typings/events";

type EventsListProps = {
  events: Event[];
  onRegisterEvent?: () => void;
};

export { type EventsListProps };
