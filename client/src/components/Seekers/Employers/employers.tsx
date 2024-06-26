import React from "react";
import { EmployersListProps } from "./types";
import { EmployerItem } from "./Item";

const EmployersList: React.FC<EmployersListProps> = ({ employers }) => {
  return (
    <div>
      {employers?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            Ops! Looks like there are no employers for this filters
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

export { EmployersList };
