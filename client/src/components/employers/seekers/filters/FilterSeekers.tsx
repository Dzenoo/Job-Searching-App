"use client";

import React, { useState } from "react";
import { ListFilter } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FilterHandler from "@/components/shared/filters/FilterHandler";
import { SkillsInformationsData } from "@/constants";

const FilterSeekers: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden lg:block">
        <div className="flex flex-col gap-10">
          {SkillsInformationsData.map((filters) => (
            <FilterHandler
              showCount={false}
              key={filters.id}
              title={filters.category}
              checkboxes={filters.data}
            />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2"
        >
          <ListFilter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
              Open Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll h-screen">
            <DialogHeader>
              <DialogTitle>Job Filters</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {SkillsInformationsData.map((filters) => (
                <FilterHandler
                  showCount={false}
                  key={filters.id}
                  title={filters.category}
                  checkboxes={filters.data}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterSeekers;
