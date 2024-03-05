import React from "react";
import { Input } from "@/components/Shared/Input";
import { Select } from "@/components/Shared/Select";
import useSearchParams from "@/hooks/useSearchParams";

const SearchJobs: React.FC = () => {
  const { performanceSearchParams, updateSearchParams, searchParams } =
    useSearchParams();

  return (
    <div className="flex justify-between gap-3">
      <div className="basis-full">
        <Input
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            performanceSearchParams("query", e.target.value, "add")
          }
        />
      </div>
      <div>
        <Select
          defaultValue={searchParams.get("sort")?.toString()}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateSearchParams("sort", e.target.value, "add")
          }
          options={[
            { label: "Sort By Date", value: "" },
            { label: "Descending", value: "asc" },
            { label: "Newest", value: "desc" },
          ]}
        />
      </div>
    </div>
  );
};

export { SearchJobs };
