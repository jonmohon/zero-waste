/**
 * Button — primary interactive element used across the storefront.
 * Used in: AddToCart, Checkout, Hero CTA, forms.
 *
 * Renders as a styled <button> or <a> depending on whether `href` is provided.
 * Supports two visual variants: "primary" (filled) and "secondary" (outlined).
 * Colors updated to match the new deep green / accent green palette.
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
    "bg-primary text-white hover:bg-accent active:bg-accent-hover shadow-md hover:shadow-lg",
  secondary:
    "border-2 border-primary/18 text-primary hover:bg-primary hover:text-white hover:border-primary active:bg-primary-light",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
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
    "inline-flex items-center justify-center rounded-lg font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
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
