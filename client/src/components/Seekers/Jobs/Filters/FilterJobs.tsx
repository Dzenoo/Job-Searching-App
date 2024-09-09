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
import { JobsFiltersData } from "@/constants";

const FilterJobs: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden lg:block">
        <FiltersContent />
      </div>
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full"
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
            <FiltersContent />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const FiltersContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {JobsFiltersData.map((filterGroup) => (
        <FilterHandler
          key={filterGroup.id}
          title={filterGroup.title}
          checkboxes={filterGroup.data}
        />
      ))}
    </div>
  );
};

export default FilterJobs;
