import { Input } from "@/components/Shared/Input";
import { Select } from "@/components/Shared/Select";
import useSearchParams from "@/hooks/useSearchParams";
import React from "react";

const SearchEmployers: React.FC = () => {
  const { updateSearchParams, searchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex items-center justify-between gap-3 max-md:flex-wrap">
      <div>
        <h1 className="text-base-black">Companies</h1>
      </div>
      <div className="flex justify-between gap-3 basis-[40em] max-lg:basis-full max-sm:flex-col">
        <div className="basis-full">
          <Input
            defaultValue={searchParams.get("query")?.toString()}
            placeholder="Search Employers..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debounceSearchParams("query", e.target.value)
            }
          />
        </div>
        <div className="max-md:basis-full">
          <Select
            defaultValue={searchParams.get("sort")?.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateSearchParams("sort", e.target.value)
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
