import { ApplicationsTypes } from "@/typings/shared";

type ApplicationsProps = {
  applications: ApplicationsTypes[];
  currentPage: number;
  itemsPerPage: number;
};

export { type ApplicationsProps };
