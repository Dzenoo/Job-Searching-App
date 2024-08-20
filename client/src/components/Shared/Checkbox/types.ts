type CheckboxProps = {
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export { type CheckboxProps };
