import { SeekerTypes } from "@/typings/seekers";
import { EducationItemProps } from "./Item/types";

type EducationsProps = {
  seeker?: SeekerTypes;
};

type EducationListProps = {
  educations: EducationItemProps[];
};

type AddEducationsDialogProps = {
  closeDialog: (dialogId: string) => void;
};

export {
  type EducationsProps,
  type EducationListProps,
  type AddEducationsDialogProps,
};
