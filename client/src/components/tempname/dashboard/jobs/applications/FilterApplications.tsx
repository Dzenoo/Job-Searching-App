import React from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center gap-10 max-sm:overflow-auto max-sm:gap-5 hide-scrollbar">
          <Button
            variant="outline"
            onClick={() => updateApplicationsFilters("")}
          >
            Seekers ({applicants})
          </Button>
          <Button
            variant="outline"
            onClick={() => updateApplicationsFilters("Pending")}
          >
            Pending ({pending})
          </Button>
          <Button
            variant="outline"
            onClick={() => updateApplicationsFilters("Interview")}
          >
            Interviews ({interviews})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterApplications;
