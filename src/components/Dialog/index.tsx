import { forwardRef, type ElementRef } from "react";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const Dialog = DialogPrimitive.Dialog;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
    ElementRef<typeof DialogPrimitive.Overlay>,
    DialogPrimitive.DialogOverlayProps
>(({ className, ...props }, ref) => {
    return (
        <DialogPrimitive.Overlay
            className={twMerge(
                "fixed inset-0 bg-black/70 backdrop-blur-sm",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<
    ElementRef<typeof DialogPrimitive.Content>,
    DialogPrimitive.DialogContentProps
>(({ className, children, ...props }, ref) => {
    return (
        <DialogPrimitive.Content
            className={twMerge(
                "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm border border-zinc-900 bg-zinc-950 p-3 focus:outline-none",
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    );
});
DialogContent.displayName = "DialogContent";

const DialogTitle = forwardRef<
    ElementRef<typeof DialogPrimitive.Title>,
    DialogPrimitive.DialogTitleProps
>(({ className, children, ...props }, ref) => {
    return (
        <DialogPrimitive.Title
            className={twMerge("font-outfit text-xl font-semibold", className)}
            ref={ref}
            {...props}
        >
            {children}
        </DialogPrimitive.Title>
    );
});
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<
    ElementRef<typeof DialogPrimitive.Description>,
    DialogPrimitive.DialogDescriptionProps
>(({ className, children, ...props }, ref) => {
    return (
        <DialogPrimitive.Description
            className={twMerge("text-sm text-zinc-500", className)}
            ref={ref}
            {...props}
        >
            {children}
        </DialogPrimitive.Description>
    );
});
DialogDescription.displayName = "DialogDescription";

export {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogClose,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
};
