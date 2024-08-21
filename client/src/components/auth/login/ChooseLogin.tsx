"use client";

import { TypeOfAccount } from "@/types";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

const ChooseLogin: React.FC = () => {
  const [typeOfAccount, setTypeOfAccount] = useState<TypeOfAccount>(
    TypeOfAccount.Seeker
  );

  const handleTypeSelection = (type: TypeOfAccount): void => {
    setTypeOfAccount(type);
  };

  return (
    <div>
      <LoginForm
        handleTypeSelection={handleTypeSelection}
        type={typeOfAccount}
      />
    </div>
  );
};

export default ChooseLogin;
