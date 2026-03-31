/**
 * Card — generic content container with subtle border and hover lift.
 * Used in: ProductCard, collection previews, feature highlights.
 *
 * Intentionally minimal — wraps children with consistent padding,
 * border radius, and an optional hover effect for interactive cards.
 *
 * @param interactive - enables hover scale/shadow effect (default: false)
 * @param children - card content
 */
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function Card({ children, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-4",
        interactive &&
          "transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
