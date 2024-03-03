import { Button } from "@/components/shared/Button";
import useSearchParams from "@/hooks/useSearchParams";
import React from "react";
import { EmployerTypeFilters } from "./types";

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
          variant={type === button.filter ? "default" : "outlined"}
          onClick={() => updateSearchParams("type", button.filter, "add")}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export { EmployerFilters };
