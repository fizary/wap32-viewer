import {
    useRef,
    useCallback,
    useEffect,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { useStore } from "@/store";
import { useDirectoryList } from "./hooks/useDirectoryList";

export const DirectoryList = () => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const directoryListRef = useRef<HTMLDivElement>(null);
    const isKeyboardEventType = useRef(false);
    const loadPath = useStore((s) => s.loadPath);
    const { collection, errorMessage } = useDirectoryList();

    const loadHandler = useCallback(
        (
            e: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>,
        ) => {
            const targetPath = e.currentTarget.dataset["path"];

            if (!targetPath) return;

            if ("key" in e) {
                if (e.key !== "Enter" && e.key !== " ") return;

                // Prevent enter key triggering click event
                e.preventDefault();
                isKeyboardEventType.current = true;
            } else isKeyboardEventType.current = false;

            loadPath(targetPath);
        },
        [loadPath],
    );

    useEffect(() => {
        if (isKeyboardEventType.current) directoryListRef.current?.focus();

        scrollAreaRef.current?.scroll({ top: 0 });
    }, [collection]);

    return (
        <div
            className="h-full overflow-y-auto text-zinc-300"
            ref={scrollAreaRef}
        >
            <Toolbar.Root
                className="ml-2.5 select-none border-l border-dashed border-zinc-300 pl-2.5"
                ref={directoryListRef}
                orientation="vertical"
                loop={false}
            >
                {collection.map(({ icon: IconComponent, name, path }) => (
                    <Toolbar.Button
                        className="flex w-full items-center gap-2.5 overflow-hidden rounded-sm px-2.5 py-1 outline-none hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white [&>svg]:shrink-0"
                        key={path}
                        data-path={path}
                        onKeyDown={loadHandler}
                        onClick={loadHandler}
                    >
                        <IconComponent className="h-5" aria-hidden />
                        <span className="overflow-hidden text-ellipsis text-nowrap">
                            {name}
                        </span>
                    </Toolbar.Button>
                ))}
            </Toolbar.Root>
            {errorMessage && (
                <div className="mt-2 text-center italic">{errorMessage}</div>
            )}
        </div>
    );
};
