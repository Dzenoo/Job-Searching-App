import React from "react";

import useSearchParams from "@/hooks/useSearchParams";

import { Input } from "@/components/ui/input";

const SearchSeekers: React.FC = () => {
  const { searchParams, updateSearchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex justify-between gap-3">
      <div className="basis-full">
        <Input
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Seekers..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSearchParams("query", e.target.value)
          }
        />
      </div>
    </div>
  );
};
export default SearchSeekers;
