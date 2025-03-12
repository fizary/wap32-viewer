import {
    forwardRef,
    type ElementRef,
    type ComponentPropsWithoutRef,
} from "react";
import { twMerge } from "tailwind-merge";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

const Accordion = forwardRef<
    ElementRef<typeof AccordionPrimitive.Accordion>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Accordion>
>(({ children, ...props }, ref) => {
    return (
        <AccordionPrimitive.Accordion ref={ref} {...props}>
            {children}
        </AccordionPrimitive.Accordion>
    );
});
Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<
    ElementRef<typeof AccordionPrimitive.Item>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, ...props }, ref) => {
    return (
        <AccordionPrimitive.Item ref={ref} {...props}>
            {children}
        </AccordionPrimitive.Item>
    );
});
AccordionItem.displayName = "AccordionItem";

const AccordionHeader = forwardRef<
    ElementRef<typeof AccordionPrimitive.Header>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ children, ...props }, ref) => {
    return (
        <AccordionPrimitive.Header ref={ref} {...props}>
            {children}
        </AccordionPrimitive.Header>
    );
});
AccordionHeader.displayName = "AccordionHeader";

const AccordionTrigger = forwardRef<
    ElementRef<typeof AccordionPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    return (
        <AccordionPrimitive.Trigger
            className={twMerge(
                "group/trigger flex w-full items-center justify-between rounded-sm px-1 py-2 text-lg leading-none ring-brand focus:outline-none focus-visible:text-white focus-visible:ring-2",
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
            <ChevronDownIcon
                className="h-5 transition-transform group-data-[state=open]/trigger:rotate-180"
                aria-hidden
            />
        </AccordionPrimitive.Trigger>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
    ElementRef<typeof AccordionPrimitive.Content>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    return (
        <AccordionPrimitive.Content
            className={twMerge(
                "overflow-hidden data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown",
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
        </AccordionPrimitive.Content>
    );
});
AccordionContent.displayName = "AccordionContent";

export {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionContent,
};
