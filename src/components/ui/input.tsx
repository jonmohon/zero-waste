/**
 * Input — styled text input used in forms, search, and checkout.
 * Used in: Search bar, checkout form, newsletter signup.
 *
 * Wraps a native <input> with consistent styling. Supports an
 * optional label rendered above the input.
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
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-lg border border-neutral-300 px-4 py-2.5 text-base text-neutral-900",
          "placeholder:text-neutral-400",
          "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none",
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    </div>
  );
}
