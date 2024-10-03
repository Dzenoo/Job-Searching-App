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

type SearchEmployersProps = {
  query: string;
  sort: string;
};

const SearchEmployers: React.FC<SearchEmployersProps> = ({ query, sort }) => {
  const { updateSearchParams, debounce } = useSearchParams();

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
            defaultValue={query}
            placeholder="Search Employers..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debounceSearchParams("query", e.target.value)
            }
          />
        </div>
        <div className="basis-1/2 max-sm:basis-full">
          <Select
            onValueChange={(value) => updateSearchParams("sort", value)}
            defaultValue={sort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sort</SelectItem>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchEmployers;
