import { SeekerTypes } from "@/types/seekers";

type SeekerProfileInformationProps = {
  seeker?: SeekerTypes;
  token: string;
};

type SeekerDeleteDialogProps = {
  token: string;
};

export { type SeekerProfileInformationProps, type SeekerDeleteDialogProps };
