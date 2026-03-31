/**
 * Button — primary interactive element used across the storefront.
 * Used in: AddToCart, Checkout, Hero CTA, forms.
 *
 * Renders as a styled <button> or <a> depending on whether `href` is provided.
 * Supports two visual variants: "primary" (filled) and "secondary" (outlined).
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
    "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900",
  secondary:
    "border border-neutral-300 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200",
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
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 cursor-pointer",
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
