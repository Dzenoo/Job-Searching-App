enum TypeOfAccount {
  Seeker = "seeker",
  Employer = "employer",
  Default = "",
}

type TabChooseAccount = {
  icon: React.ReactNode;
  text: string;
  selected: boolean;
  handler: () => void;
};

export { TypeOfAccount, type TabChooseAccount };
