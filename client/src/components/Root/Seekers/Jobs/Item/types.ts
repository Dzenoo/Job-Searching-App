type JobItemProps = {
  job: {
    title: string;
    position: string;
    location: string;
    type: string;
    skills: string[];
    level: string;
    salary: number;
    expiration_date: string;
    description: string;
    overview: string;
  };
};

type FooterInfoDataProps = {
  data: string;
  icon: React.JSX.Element;
  id: string;
};

export { type JobItemProps, type FooterInfoDataProps };
