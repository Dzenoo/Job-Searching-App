"use client";

import React, { useState } from "react";
import { Tab } from "@/components/Shared/Tab";
import { TabChooseAccount, TypeOfAccount } from "./types";
import { Briefcase, Building } from "lucide-react";
import { SeekersSignupForm } from "../SeekersSignupForm";
import { EmployersSignupForm } from "../EmployersSignupForm";
import Link from "next/link";

const ChooseTypeAccount: React.FC = () => {
  const [typeOfAccount, setTypeOfAccount] = useState<TypeOfAccount>(
    TypeOfAccount.Default
  );

  const handleTypeSelection = (type: TypeOfAccount): void => {
    setTypeOfAccount(type);
  };

  const employer = typeOfAccount === TypeOfAccount.Employer;
  const seeker = typeOfAccount === TypeOfAccount.Seeker;
  const isSelectedAccount =
    typeOfAccount === TypeOfAccount.Seeker ||
    typeOfAccount === TypeOfAccount.Employer;

  return (
    <div>
      {!isSelectedAccount && (
        <div className="flex flex-col justify-center items-center gap-16">
          <div>
            <h1 className="text-base-black">Join as a Employer or Seeker</h1>
          </div>
          <div className="flex justify-between gap-3">
            {Array.from([
              {
                icon: <Building />,
                text: "Im a Employer, looking for talents",
                handler: () => handleTypeSelection(TypeOfAccount.Employer),
                selected: employer,
              },
              {
                icon: <Briefcase />,
                text: "Im a Seeker, looking for job",
                handler: () => handleTypeSelection(TypeOfAccount.Seeker),
                selected: seeker,
              },
            ]).map((tab) => renderTab(tab))}
          </div>
          <div>
            <p className="text-low-gray">
              Already have account?{" "}
              <Link href="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
      {employer && (
        <div className="pb-16">
          <EmployersSignupForm handleTypeSelection={handleTypeSelection} />
        </div>
      )}
      {seeker && (
        <SeekersSignupForm handleTypeSelection={handleTypeSelection} />
      )}
    </div>
  );
};

function renderTab<T extends TabChooseAccount>({
  icon,
  text,
  selected,
  handler,
}: T): React.JSX.Element {
  return (
    <Tab
      className="flex flex-col gap-7 w-full"
      selected={selected}
      onClick={handler}
      key={text}
    >
      <div>
        <div>{icon}</div>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-initial-black text-left">{text}</h1>
      </div>
    </Tab>
  );
}

export { ChooseTypeAccount };
