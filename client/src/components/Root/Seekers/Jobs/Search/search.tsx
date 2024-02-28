import React from "react";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import useSearchParams from "@/hooks/useSearchParams";

const SearchJobs: React.FC = () => {
  const { performanceSearchParams, updateSearchParams } = useSearchParams();

  return (
    <div className="flex justify-between gap-3">
      <div className="basis-full">
        <Input
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            performanceSearchParams("query", e.target.value, "add")
          }
        />
      </div>
      <div>
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateSearchParams("sort", e.target.value, "add")
          }
          options={[
            { label: "Sort By Date", value: "" },
            { label: "Newest", value: "asc" },
            { label: "Descending", value: "desc" },
          ]}
        />
      </div>
    </div>
  );
};

export { SearchJobs };
