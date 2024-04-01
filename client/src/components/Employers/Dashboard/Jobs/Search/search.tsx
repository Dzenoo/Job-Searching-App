import React from "react";
import { SearchJobsProps } from "./types";
import { Input } from "@/components/Shared/Input";
import { Select } from "@/components/Shared/Select";
import useSearchParams from "@/hooks/useSearchParams";
import { LinkElement } from "@/components/Shared/Link";

const SearchJobs: React.FC<SearchJobsProps> = () => {
  const { searchParams, updateSearchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex justify-between gap-3 items-center max-sm:flex-wrap">
      <div className="basis-full">
        <Input
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSearchParams("query", e.target.value)
          }
        />
      </div>
      <div className="max-sm:basis-full">
        <Select
          defaultValue={searchParams.get("sort")?.toString()}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateSearchParams("sort", e.target.value)
          }
          options={[
            { label: "Sort By Date", value: "" },
            { label: "Descending", value: "asc" },
            { label: "Newest", value: "desc" },
          ]}
        />
      </div>
      <div className="basis-full">
        <LinkElement variant="default" href="/dashboard/jobs/new">
          Add New Job
        </LinkElement>
      </div>
    </div>
  );
};

export { SearchJobs };
