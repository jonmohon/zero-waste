/**
 * Button — primary interactive element used across the storefront.
 * Used in: AddToCart, Checkout, Hero CTA, forms.
 *
 * Renders as a styled <button> or <a> depending on whether `href` is provided.
 * Supports two visual variants: "primary" (filled) and "secondary" (outlined).
 * Refined with smoother transitions and premium feel.
 *
 * @param variant - visual style: "primary" (default) or "secondary"
 * @param size - button size: "sm", "md" (default), or "lg"
 * @param children - button label / content
 * @param href - if provided, renders as an <a> tag instead of <button>
 */
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-accent hover:-translate-y-px active:bg-accent-hover shadow-md hover:shadow-lg active:translate-y-0",
  secondary:
    "border-2 border-primary/15 text-primary hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-px active:bg-primary-light active:translate-y-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  /* If href is provided, render as a link styled like a button */
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
