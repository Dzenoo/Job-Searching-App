type FormInfoProps = {
  children: React.ReactNode;
  variant?: keyof typeof FormInfoVariants;
} & Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">;

enum FormInfoVariants {
  default = "text-white dark:text-gray-900",
  danger = "text-red-400",
  warning = "text-yellow-400",
}

type FormItemProps<
  T extends React.HTMLAttributes<HTMLDivElement> = React.HTMLAttributes<HTMLDivElement>
> = {
  children: React.ReactNode;
} & Omit<T, "children">;

type FormProps<
  T extends React.FormHTMLAttributes<HTMLFormElement> = React.FormHTMLAttributes<HTMLFormElement>
> = {
  children: React.ReactNode;
} & Omit<T, "children">;

export {
  type FormProps,
  type FormItemProps,
  type FormInfoProps,
  FormInfoVariants,
};
