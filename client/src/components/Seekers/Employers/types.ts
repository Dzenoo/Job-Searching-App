import { EmployerTypes } from "@/types/employers";

type EmployersListProps = {
  employers?: EmployerTypes[];
};

type FollowEmployerProps = {
  employerId: string;
};

export { type EmployersListProps, type FollowEmployerProps };
