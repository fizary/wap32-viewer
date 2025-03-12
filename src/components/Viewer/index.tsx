import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { type LucideIcon } from "lucide-react";

type ViewerProps = ComponentPropsWithoutRef<"div">;

export const Viewer = forwardRef<HTMLDivElement, ViewerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={twMerge(
                    "flex grow items-center justify-center rounded-md bg-zinc-900 p-4",
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);

type ViewerTextProps = ComponentPropsWithoutRef<"div"> & { icon: LucideIcon };

export const ViewerText = forwardRef<HTMLDivElement, ViewerTextProps>(
    ({ icon: IconComponent, className, children, ...props }, ref) => {
        return (
            <div
                className={twMerge(
                    "flex flex-col items-center gap-2.5 text-center",
                    className,
                )}
                ref={ref}
                {...props}
            >
                <IconComponent className="size-12 stroke-1" aria-hidden />
                {children}
            </div>
        );
    },
);
