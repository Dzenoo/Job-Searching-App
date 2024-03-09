import { HTMLProps } from "react";

type Option = {
  label: string;
  value: string;
};

type TagProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  onSelect: (selectedItems: string[]) => void;
} & HTMLProps<HTMLDivElement>;

export { type TagProps };
