import { ApplicationsTypes } from "@/types/shared";

type ApplicationsProps = {
  applications: ApplicationsTypes[];
  currentPage: number;
  itemsPerPage: number;
};

export { type ApplicationsProps };
