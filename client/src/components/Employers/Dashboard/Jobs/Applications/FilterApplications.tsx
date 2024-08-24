import React from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { Card, CardContent } from "@/components/ui/card";

type FilterApplicationsProps = {
  applicants: number;
  pending: number;
  interviews: number;
};

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
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default FilterApplications;
