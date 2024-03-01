enum LabelVariants {
  default = "text-gray-900",
  danger = "text-red-400",
  warning = "text-yellow-400",
}

enum TextareaVariants {
  default = "border-gray-300 hover:border-gray-400 focus:border-gray-400",
  danger = "border-red-400 hover:border-red-600 text-red-700 focus:border-red-600",
  warning = "border-yellow-400 hover:border-yellow-600 text-yellow-700 focus:border-yellow-600",
}

type TextareaProps = {
  label?: string;
  variant?: keyof typeof TextareaVariants;
  action?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "children">;

export { LabelVariants, TextareaVariants, type TextareaProps };
