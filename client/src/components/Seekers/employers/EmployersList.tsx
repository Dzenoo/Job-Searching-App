import React from "react";
import EmployerItem from "./EmployerItem";
import { EmployerTypes } from "@/types";

type EmployersListProps = {
  employers?: EmployerTypes[];
};

const EmployersList: React.FC<EmployersListProps> = ({ employers }) => {
  return (
    <div>
      {employers?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            No results found for the selected filters.
          </h1>
        </div>
      )}
      <ul className="grid gap-3 grid-cols-3 max-[1680px]:grid-cols-2 max-lg:grid-cols-1">
        {employers?.map((employer) => (
          <EmployerItem employer={employer} key={employer._id} />
        ))}
      </ul>
    </div>
  );
};

export default EmployersList;
