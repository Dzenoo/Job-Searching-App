type Seeker = {
  _id: string;
  biography: string;
  image: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  portfolio: string;
  linkedin: string;
  github: string;
  notifications: {
    title: string;
    message: string;
    date: Date;
  }[];
  applications: string[];
  skills: string[];
  education: {
    _id: string;
    institution: string;
    graduationDate: string;
    fieldOfStudy: string;
    degree: string;
  }[];
  savedJobs: string[];
  following: string[];
  directMessages: {
    employerId: string;
    messages: string[];
  }[];
  events: string[];
  alerts: {
    title: string;
    type: string;
    level: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
