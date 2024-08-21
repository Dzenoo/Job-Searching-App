import React from "react";
import { SeekerTypes } from "@/types";
import SeekerItem from "./SeekerItem";

type SeekersListProps = {
  seekers: SeekerTypes[];
};

const SeekersList: React.FC<SeekersListProps> = ({ seekers }) => {
  return (
    <div>
      {seekers?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            Ops! Looks like there are no seekers founded
          </h1>
        </div>
      )}
      <ul className="grid gap-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {seekers?.length > 0 &&
          seekers?.map((seeker) => (
            <SeekerItem seeker={seeker} key={seeker._id} />
          ))}
      </ul>
    </div>
  );
};

export default SeekersList;
