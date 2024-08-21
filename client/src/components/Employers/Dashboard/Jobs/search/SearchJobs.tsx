import React from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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

const SearchJobs: React.FC = () => {
  const { searchParams, updateSearchParams, debounce } = useSearchParams();

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
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSearchParams("query", e.target.value)
          }
        />
      </div>
      <div className="max-sm:basis-full">
        <Select
          onValueChange={handleSortChange}
          defaultValue={searchParams.get("sort")?.toString() || ""}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="">Sort By Date</SelectItem>
              <SelectItem value="asc">Descending</SelectItem>
              <SelectItem value="desc">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="basis-full">
        <Link href="/dashboard/jobs/new">
          <Button variant="default">Add New Job</Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchJobs;
