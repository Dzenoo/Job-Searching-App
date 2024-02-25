enum ButtonVariants {
  default = "bg-indigo-700 hover:bg-indigo-900",
  warning = "bg-yellow-400 hover:bg-yellow-600",
  danger = "bg-red-600 hover:bg-red-800",
  success = "bg-green-600 hover:bg-green-800",
  outlined = "bg-none border border-gray-300 text-black hover:bg-[#ebebeb]",
  info = "bg-blue-700 hover:bg-blue-800",
}

type ButtonProps = {
  children: React.ReactNode;
  variant: keyof typeof ButtonVariants;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export { ButtonVariants, type ButtonProps };
