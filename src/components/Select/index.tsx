import {
    forwardRef,
    type ElementRef,
    type ComponentPropsWithoutRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { Portal } from "@ark-ui/react/portal";
import { Select as SelectPrimitive } from "@ark-ui/react/select";
import { ChevronDownIcon } from "lucide-react";

const Select = forwardRef<
    ElementRef<typeof SelectPrimitive.RootProvider>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.RootProvider>
>(({ children, ...props }, ref) => {
    return (
        <SelectPrimitive.RootProvider ref={ref} {...props}>
            {children}
            <SelectPrimitive.HiddenSelect />
        </SelectPrimitive.RootProvider>
    );
});
Select.displayName = "Select";

const SelectLabel = forwardRef<
    ElementRef<typeof SelectPrimitive.Label>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.Label
            className={twMerge("text-sm text-zinc-300", className)}
            ref={ref}
            {...props}
        >
            {children}
        </SelectPrimitive.Label>
    );
});
SelectLabel.displayName = "SelectLabel";

const SelectTrigger = forwardRef<
    ElementRef<typeof SelectPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.Control>
            <SelectPrimitive.Trigger
                ref={ref}
                className={twMerge(
                    "flex w-full select-none items-center justify-between gap-1 rounded-sm border border-zinc-300 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 ring-brand focus:outline-none focus-visible:border-brand focus-visible:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            >
                <div className="flex items-center gap-2.5 overflow-hidden [&>svg]:shrink-0">
                    {children}
                </div>
                <SelectPrimitive.Indicator className="transition-transform data-[state=open]:rotate-180">
                    <ChevronDownIcon className="size-4" />
                </SelectPrimitive.Indicator>
            </SelectPrimitive.Trigger>
        </SelectPrimitive.Control>
    );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = forwardRef<
    ElementRef<typeof SelectPrimitive.ValueText>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.ValueText>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.ValueText
            ref={ref}
            className={twMerge(
                "overflow-hidden text-ellipsis text-nowrap",
                className,
            )}
            {...props}
        >
            {children}
        </SelectPrimitive.ValueText>
    );
});
SelectValue.displayName = "SelectValue";

const SelectContent = forwardRef<
    ElementRef<typeof SelectPrimitive.Content>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    return (
        <Portal>
            <SelectPrimitive.Positioner>
                <SelectPrimitive.Content
                    ref={ref}
                    className={twMerge(
                        "select-none rounded-sm border border-zinc-300 bg-zinc-950 p-1 text-sm text-zinc-300 ring-brand focus:outline-none focus-visible:border-brand focus-visible:ring-1",
                        className,
                    )}
                    {...props}
                >
                    {children}
                </SelectPrimitive.Content>
            </SelectPrimitive.Positioner>
        </Portal>
    );
});
SelectContent.displayName = "SelectContent";

const SelectItem = forwardRef<
    ElementRef<typeof SelectPrimitive.Item>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.Item
            ref={ref}
            className={twMerge(
                "cursor-pointer rounded-sm px-2 py-1.5 data-[disabled]:pointer-events-none data-[highlighted]:bg-brand data-[highlighted]:text-white data-[disabled]:opacity-50",
                className,
            )}
            {...props}
        >
            <div className="flex items-center gap-2.5 overflow-hidden [&>svg]:shrink-0">
                {children}
            </div>
        </SelectPrimitive.Item>
    );
});
SelectItem.displayName = "SelectItem";

const SelectItemText = forwardRef<
    ElementRef<typeof SelectPrimitive.ItemText>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.ItemText
            ref={ref}
            className={twMerge(
                "overflow-hidden text-ellipsis text-nowrap",
                className,
            )}
            {...props}
        >
            {children}
        </SelectPrimitive.ItemText>
    );
});
SelectItemText.displayName = "SelectItemText";

export {
    Select,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectItemText,
};
