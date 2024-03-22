enum LabelVariants {
  default = "dark:text-white text-gray-900",
  danger = "text-red-400",
  warning = "text-yellow-400",
}

enum SelectVariants {
  default = "dark:text-white dark:border-[#1b1b1b] dark:bg-[#0d0d0d] text-black border-gray-300 bg-white hover:border-gray-400 focus:border-gray-400 dark:hover:border-gray-400 dark:focus:border-gray-400",
  danger = "border-red-400 hover:border-red-600 text-red-700 focus:border-red-600",
  warning = "border-yellow-400 hover:border-yellow-600 text-yellow-700 focus:border-yellow-600",
}

type OptionProps = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: OptionProps[];
  label?: string;
  variant?: keyof typeof SelectVariants;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

export { LabelVariants, SelectVariants, type OptionProps, type SelectProps };
