type NavbarLinksListProps = {
  pathname: string;
  data: {
    id: string;
    title: string;
    icon: React.JSX.Element;
    href: string;
  }[];
};

export { type NavbarLinksListProps };
