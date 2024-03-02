import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import useSearchParams from "@/hooks/useSearchParams";
import React from "react";

const SearchEmployers: React.FC = () => {
  const { performanceSearchParams, updateSearchParams, searchParams } =
    useSearchParams();

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h1 className="text-base-black">Companies</h1>
      </div>
      <div className="flex justify-between gap-3 basis-[40em]">
        <div className="basis-full">
          <Input
            defaultValue={searchParams.get("query")?.toString()}
            placeholder="Search Employers..."
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
              { label: "Sort", value: "" },
              { label: "Followers", value: "followers" },
              { label: "Reviews", value: "reviews" },
              { label: "Events", value: "events" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export { SearchEmployers };
