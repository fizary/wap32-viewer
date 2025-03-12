import { forwardRef, type ElementRef } from "react";
import { twMerge } from "tailwind-merge";
import * as SwitchPrimitive from "@radix-ui/react-switch";

const Switch = forwardRef<
    ElementRef<typeof SwitchPrimitive.Root>,
    SwitchPrimitive.SwitchProps
>(({ className, children, ...props }, ref) => {
    return (
        <SwitchPrimitive.Root
            className={twMerge(
                "h-6 w-10 rounded-full bg-zinc-800 p-0.5 ring-brand focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
        </SwitchPrimitive.Root>
    );
});
Switch.displayName = "Switch";

const SwitchThumb = forwardRef<
    ElementRef<typeof SwitchPrimitive.Thumb>,
    SwitchPrimitive.SwitchThumbProps
>(({ className, ...props }, ref) => {
    return (
        <SwitchPrimitive.Thumb
            className={twMerge(
                "block aspect-square h-full rounded-full bg-zinc-600 transition-transform duration-100 data-[state=checked]:translate-x-4 data-[state=checked]:bg-zinc-300",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
SwitchThumb.displayName = "SwitchThumb";

export { Switch, SwitchThumb };
