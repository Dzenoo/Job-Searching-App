import { EventTypes } from "@/types/events";

type EventsListProps = {
  events: EventTypes[];
  onRegisterEvent?: () => void;
};

export { type EventsListProps };
