import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "border border-black bg-white text-black hover:bg-neutral-100",
  ghost: "text-black hover:bg-neutral-100",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-colors disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return cn(
    "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-colors",
    variants[variant],
    sizes[size],
  );
}
