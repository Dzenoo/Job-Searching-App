import { JobTypes } from "@/types/jobs";

type DashboardEmployerJobsProps = {
  jobs: JobTypes[];
  currentPage: number;
  itemsPerPage: number;
};

export { type DashboardEmployerJobsProps };
