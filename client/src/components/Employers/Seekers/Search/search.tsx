import React from "react";
import { SearchSeekersProps } from "./types";
import { Input } from "@/components/Shared/Input";
import useSearchParams from "@/hooks/useSearchParams";

const SearchSeekers: React.FC<SearchSeekersProps> = () => {
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

export { SearchSeekers };
