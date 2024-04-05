import React from "react";
import { FilterApplicationsProps } from "./types";
import { Card } from "@/components/Shared/Card";
import useSearchParams from "@/hooks/useSearchParams";

const FilterApplications: React.FC<FilterApplicationsProps> = ({
  applicants,
  pending,
  interviews,
}) => {
  const { updateSearchParams } = useSearchParams();

  const updateApplicationsFilters = (filter: string) => {
    updateSearchParams("type", filter);
  };

  return (
    <Card>
      <div className="flex items-center gap-10">
        <button onClick={() => updateApplicationsFilters("")}>
          Seekers ({applicants})
        </button>
        <button onClick={() => updateApplicationsFilters("Pending")}>
          Pending ({pending})
        </button>
        <button onClick={() => updateApplicationsFilters("Interview")}>
          Interviews ({interviews})
        </button>
      </div>
    </Card>
  );
};

export { FilterApplications };
