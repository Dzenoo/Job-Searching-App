enum LabelVariants {
  default = "text-white dark:text-gray-900",
  danger = "text-red-400",
  warning = "text-yellow-400",
}

enum InputVariants {
  default = "text-white border-[#1b1b1b] bg-[#0d0d0d] hover:border-gray-400 dark:hover:border-gray-400 dark:focus:border-gray-400 focus:border-gray-400 dark:bg-white dark:text-black dark:border-gray-300 ",
  danger = "border-red-400 hover:border-red-600 text-red-700 focus:border-red-600",
  warning = "border-yellow-400 hover:border-yellow-600 text-yellow-700 focus:border-yellow-600",
}
enum InputTypeAttributes {
  number = "number",
  file = "file",
  text = "text",
  color = "color",
  password = "password",
  date = "date",
  email = "email",
}

type InputProps = {
  type?: keyof typeof InputTypeAttributes;
  label?: string;
  variant?: keyof typeof InputVariants;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export { LabelVariants, InputVariants, InputTypeAttributes, type InputProps };
