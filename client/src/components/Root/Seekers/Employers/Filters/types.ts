enum EmployerType {
  reviews = "reviews",
  event = "events",
  jobs = "jobs",
}

type EmployerTypeFilters = {
  type: keyof typeof EmployerType;
};

export { type EmployerTypeFilters, EmployerType };
