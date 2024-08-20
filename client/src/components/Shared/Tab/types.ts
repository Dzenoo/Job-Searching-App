type TabProps = {
  children: React.ReactNode;
  selected?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export { type TabProps };
