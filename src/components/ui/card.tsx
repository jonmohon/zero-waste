/**
 * Card — generic content container with subtle border and hover lift.
 * Used in: ProductCard, collection previews, feature highlights, account forms.
 *
 * Intentionally minimal — wraps children with consistent padding,
 * border radius, and an optional hover effect for interactive cards.
 * Refined with softer shadow and smoother transitions.
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
        "rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
