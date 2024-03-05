import React from "react";
import { EmployerTypeFilters } from "./types";
import useSearchParams from "@/hooks/useSearchParams";
import { Button } from "@/components/Shared/Button";

const EmployerFilters: React.FC<EmployerTypeFilters> = ({ type }) => {
  const { updateSearchParams } = useSearchParams();

  const FilterButtons = Array(
    {
      id: "1",
      title: "Jobs",
      filter: "jobs",
    },
    {
      id: "2",
      title: "Events",
      filter: "events",
    },
    {
      id: "3",
      title: "Reviews",
      filter: "reviews",
    }
  );

  return (
    <div className="flex items-center gap-3">
      {FilterButtons.map((button) => (
        <Button
          key={button.id}
          variant={type === button.filter ? "default" : "outlined"}
          onClick={() => updateSearchParams("typeEmp", button.filter, "add")}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export { EmployerFilters };
