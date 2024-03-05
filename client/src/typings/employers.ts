enum SizeOfEmployers {
  "Less-than-17" = "Less-than-17",
  "20-50" = "20-50",
  "50-100" = "50-100",
  "100-250" = "100-250",
  "250-500" = "250-500",
  "500-1000" = "500-1000",
}

type Employer = {
  _id: string;
  image: string;
  industry: string;
  company_description: string;
  size: keyof typeof SizeOfEmployers;
  website: string;
  address: string;
  number: number;
  email: string;
  name: string;
  password: string;
  notifications: {
    title: string;
    message: string;
    date: Date;
  }[];
  jobs: string[];
  followers: string[];
  directMessages: {
    seekerId: string;
    messages: string[];
  }[];
  events: string[];
  reviews: string[];
};

export { type Employer, SizeOfEmployers };
