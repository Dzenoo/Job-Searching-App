import { Employer } from "@/typings/employers";

type EmployersListProps = {
  employers: Employer[];
};

type FollowEmployerProps = {
  employerId: string;
};

export { type EmployersListProps, type FollowEmployerProps };
