enum EventLocation {
  Online = "Online",
  InPerson = "InPerson",
  Hybrid = "Hybrid",
  Virtual = "Virtual",
  Outdoor = "Outdoor",
  Indoor = "Indoor",
}

enum EventCategory {
  Conference = "Conference",
  Seminar = "Seminar",
  Workshop = "Workshop",
  Networking = "Networking",
  Webinar = "Webinar",
  Hackathon = "Hackathon",
  JobFair = "JobFair",
  Meetup = "Meetup",
  Exhibition = "Exhibition",
  Other = "Other",
}

type EventTypes = {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  location: keyof typeof EventLocation | string;
  category: keyof typeof EventCategory | string;
  company: string;
  seekers: string[];
};

export { type EventTypes, EventLocation, EventCategory };
