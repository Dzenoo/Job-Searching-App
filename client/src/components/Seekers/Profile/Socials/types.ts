import { SeekerTypes } from "@/types/seekers";

type SocialsProps = {
  seeker?: SeekerTypes;
};

type SocialsDialogProps = {
  closeDialog: (dialogId: string) => void;
  seeker?: {
    portfolio: string;
    linkedin: string;
    github: string;
  };
};

export { type SocialsProps, type SocialsDialogProps };
