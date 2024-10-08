"use client";
import React from "react";
import Link from "next/link";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

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

  const handleSortChange = (value: string) => {
    updateSearchParams("sort", value);
  };

  return (
    <div className="flex justify-between gap-3 items-center max-sm:flex-wrap">
      <div className="basis-full">
        <Input
          defaultValue={query}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSearchParams("query", e.target.value)
          }
        />
      </div>
      <div className="max-sm:basis-full">
        <Select onValueChange={handleSortChange} defaultValue={sort}>
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="all">Sort By Date</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="basis-full">
        <Link href="/dashboard/jobs/new">
          <Button className="w-full" variant="default">
            Add New Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchJobs;
