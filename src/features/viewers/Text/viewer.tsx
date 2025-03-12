import { twJoin } from "tailwind-merge";
import { useStore } from "@/store";
import { decode } from "@/utils/decoders";

export const TextViewer = () => {
    const file = useStore((s) => s.file);
    const encoding = useStore((s) => s.encoding);
    const breakSpaces = useStore((s) => s.breakSpaces);

    return (
        <div
            className="flex grow flex-col overflow-y-auto rounded-md bg-zinc-900 ring-brand focus:outline-none focus-visible:ring-2"
            tabIndex={0}
        >
            <pre
                className={twJoin(
                    "grow break-words p-4",
                    breakSpaces && "whitespace-break-spaces",
                )}
            >
                {file && file.content
                    ? decode(file.content.view, encoding)
                    : ""}
            </pre>
        </div>
    );
};
