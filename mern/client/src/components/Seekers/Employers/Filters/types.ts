enum EmployerType {
  reviews = "reviews",
  events = "events",
  jobs = "jobs",
}

type EmployerTypeFilters = {
  type: keyof typeof EmployerType;
};

export { type EmployerTypeFilters, EmployerType };
