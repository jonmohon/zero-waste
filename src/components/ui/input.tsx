/**
 * Input — styled text input used in forms, search, and checkout.
 * Used in: Search bar, checkout form, newsletter signup, auth forms.
 *
 * Wraps a native <input> with consistent styling and smooth focus transitions.
 * Supports an optional label rendered above the input.
 *
 * @param label - optional label text displayed above the input
 * @param id - HTML id, also used as the label's `htmlFor`
 */
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-primary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary",
          "placeholder:text-neutral-400",
          "focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-none",
          "transition-all duration-200",
          "hover:border-neutral-300",
          className
        )}
        {...props}
      />
    </div>
  );
}
