import { fetchCountries } from "@/utils/actions";

export let EventsFiltersData = [
  {
    id: "1",
    title: "Category",
    checkboxes: [
      {
        id: "1",
        title: "Internship",
        value: "Internship",
        type: "type",
      },
      {
        id: "2",
        title: "Full-Time",
        value: "Full-Time",
        type: "type",
      },
      {
        id: "3",
        title: "Part-Time",
        value: "Part-Time",
        type: "type",
      },
      {
        id: "4",
        title: "Freelance",
        value: "Freelance",
        type: "type",
      },
    ],
  },
  {
    id: "2",
    title: "Location",
    checkboxes: [],
  },
];

fetchCountries().then((countries) => {
  const mappedCountries = countries.map((country: any) => ({
    id: country.cca,
    title: country.name.common,
    value: country.name.common,
    type: "location",
  }));

  mappedCountries.sort((a: any, b: any) => a.title.localeCompare(b.title));

  const locationFilter = EventsFiltersData.find(
    (filter) => filter.title === "Location"
  );
  if (locationFilter) {
    locationFilter.checkboxes = mappedCountries;
  }
});
