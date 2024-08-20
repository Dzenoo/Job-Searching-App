enum LabelVariants {
  default = "dark:text-white text-gray-900",
  danger = "text-red-400",
  warning = "text-yellow-400",
}

type RadioProps = {
  variant: keyof typeof LabelVariants;
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export { LabelVariants, type RadioProps };
