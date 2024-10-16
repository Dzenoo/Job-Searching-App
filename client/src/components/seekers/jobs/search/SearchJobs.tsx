"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import useSearchParams from "@/hooks/defaults/useSearchParams";

type SearchJobsProps = {
  query: string;
  sort: string;
};

const SearchJobs: React.FC<SearchJobsProps> = ({ query, sort }) => {
  const { updateSearchParams, debounce } = useSearchParams();

  const debounceSearchParams = React.useMemo(
    () => debounce(updateSearchParams, 300),
    [updateSearchParams]
  );

  return (
    <div className="flex justify-between gap-3 max-sm:flex-wrap">
      <div className="basis-full">
        <Input
          value={query}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            debounceSearchParams("query", value);
            if (value === "") {
              updateSearchParams("query", "");
            }
          }}
        />
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => updateSearchParams("sort", value)}
          defaultValue={sort}
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

export default SearchJobs;
