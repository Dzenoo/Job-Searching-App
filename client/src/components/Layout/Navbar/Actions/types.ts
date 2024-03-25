type NavbarActionsListProps = {
  data: {
    id: string;
    href: string;
    icon: React.JSX.Element;
  }[];
  logout: () => void;
  pathname: string;
  notifications: number;
};

export { type NavbarActionsListProps };
