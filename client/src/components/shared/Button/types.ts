enum ButtonVariants {
  default = "bg-[--blue-base-color] hover:bg-[#004fc7] text-white",
  warning = "bg-yellow-400 hover:bg-yellow-600 text-white",
  danger = "bg-[--red-base-color] hover:bg-red-800 text-white",
  success = "bg-[--green-base-color] hover:bg-green-800 text-white",
  outlined = "bg-none border border-gray-300 dark:border-[#3b3b3b] hover:bg-[#ebebeb] dark:hover:bg-[#0d0d0d]",
  info = "bg-blue-700 hover:bg-blue-800 ",
}

type ButtonProps = {
  children: React.ReactNode;
  variant: keyof typeof ButtonVariants;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export { ButtonVariants, type ButtonProps };
