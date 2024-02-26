import { TypeOfAccount } from "../../Signup/ChooseTypeAccount/types";

type LoginFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
  type: TypeOfAccount;
};

export { type LoginFormTypes };
