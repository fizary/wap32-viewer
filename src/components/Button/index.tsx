import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                className={twMerge(
                    "flex select-none items-center justify-center rounded-sm bg-zinc-900 px-2 py-1 text-zinc-300 ring-brand hover:bg-brand hover:text-white focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    },
);
Button.displayName = "Button";
