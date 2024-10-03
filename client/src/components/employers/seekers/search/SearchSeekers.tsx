"use client";

import React, { Suspense } from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Input } from "@/components/ui/input";

const Search: React.FC = () => {
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

const SearchSeekers = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default SearchSeekers;
