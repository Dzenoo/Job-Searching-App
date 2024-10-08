"use client";

import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Input } from "@/components/ui/input";

type SearchSeekersProps = {
  query: string;
};

const SearchSeekers: React.FC<SearchSeekersProps> = ({ query }) => {
  const { updateSearchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex justify-between gap-3">
      <div className="basis-full">
        <Input
          defaultValue={query}
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
