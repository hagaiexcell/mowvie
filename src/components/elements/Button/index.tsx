interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  classname?: string;
}

export default function Button(props: ButtonProps) {
  const { children, variant, classname } = props;

  const variantClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-black",
  };

  return (
    <button
      className={`${variantClasses[variant]} rounded-lg px-5 py-3 font-semibold leading-none transition-all duration-100 hover:bg-opacity-70 ${classname}`}
      type="submit"
    >
      {children}
    </button>
  );
}
