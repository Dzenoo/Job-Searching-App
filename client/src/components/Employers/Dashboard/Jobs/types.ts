import { JobTypes } from "@/typings/jobs";

type DashboardEmployerJobsProps = {
  jobs: JobTypes[];
  currentPage: number;
  itemsPerPage: number;
};

export { type DashboardEmployerJobsProps };
