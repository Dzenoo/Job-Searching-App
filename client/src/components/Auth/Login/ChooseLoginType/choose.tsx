"use client";

import React, { useState } from "react";
import { TypeOfAccount } from "../../Signup/ChooseTypeAccount/types";
import { LoginFormAccount } from "../LoginFormAcount";

const ChooseLoginType: React.FC = () => {
  const [typeOfAccount, setTypeOfAccount] = useState<TypeOfAccount>(
    TypeOfAccount.Seeker
  );

  const handleTypeSelection = (type: TypeOfAccount): void => {
    setTypeOfAccount(type);
  };

  return (
    <div>
      <LoginFormAccount
        handleTypeSelection={handleTypeSelection}
        type={typeOfAccount}
      />
    </div>
  );
};

export { ChooseLoginType };
