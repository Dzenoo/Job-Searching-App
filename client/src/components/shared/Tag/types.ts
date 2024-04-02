import { HTMLProps } from "react";

type Option = {
  label: string;
  value: string;
};

type TagProps = {
  height?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  onSelect: (selectedItems: string[]) => void;
  initials?: string[];
} & HTMLProps<HTMLDivElement>;

export { type TagProps };
