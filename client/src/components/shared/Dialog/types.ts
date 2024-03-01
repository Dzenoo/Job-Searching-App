type DialogProps = {
  showCloseButton?: boolean;
  className?: string;
  isOpen: boolean;
  render: (parameters: any) => React.ReactNode;
  onCloseDialog: () => void;
};

export { type DialogProps };
