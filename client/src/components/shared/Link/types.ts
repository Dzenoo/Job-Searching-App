enum LinkVariants {
  default = "bg-[--blue-base-color] hover:bg-[#004fc7] text-white",
  warning = "bg-yellow-400 hover:bg-yellow-600 text-white",
  danger = "bg-[--red-base-color] hover:bg-red-800 text-white",
  success = "bg-[--green-base-color] hover:bg-green-800 text-white",
  outlined = "bg-none border border-gray-300 text-black hover:bg-[#ebebeb]",
  info = "bg-blue-700 hover:bg-blue-800 ",
}

type LinkProps = {
  children: React.ReactNode;
  variant: keyof typeof LinkVariants;
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

export { LinkVariants, type LinkProps };
