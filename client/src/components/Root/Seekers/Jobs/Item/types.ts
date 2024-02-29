type JobItemProps = {
  job: JobProps;
  showDescription?: boolean;
};

type FooterInfoDataProps = {
  data: string;
  icon: React.JSX.Element;
  id: string;
};

type JobProps = {
  title: string;
  position: string;
  location: string;
  type: string;
  skills: string[];
  level: string;
  salary: number;
  _id: string;
  expiration_date: string;
  description: string;
  overview: string;
};

export { type JobItemProps, type FooterInfoDataProps, type JobProps };
