"use client";

import React, { Suspense } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import useSearchParams from "@/hooks/defaults/useSearchParams";

const Search: React.FC = () => {
  const { searchParams, updateSearchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex justify-between gap-3 max-sm:flex-wrap">
      <div className="basis-full">
        <Input
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSearchParams("query", e.target.value)
          }
        />
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => updateSearchParams("sort", value)}
          defaultValue={searchParams.get("sort")?.toString() || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sort By Date</SelectItem>
            <SelectItem value="asc">Descending</SelectItem>
            <SelectItem value="desc">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const SearchJobs = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default SearchJobs;
