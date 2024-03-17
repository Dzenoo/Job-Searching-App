type SocialsProps = {
  seeker: Seeker;
};

type SocialsDialogProps = {
  closeDialog: (dialogId: string) => void;
  seeker: {
    portfolio: string;
    linkedin: string;
    github: string;
  };
};

export { type SocialsProps, type SocialsDialogProps };
