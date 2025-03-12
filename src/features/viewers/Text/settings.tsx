import { createListCollection } from "@ark-ui/react/collection";
import { useSelect } from "@ark-ui/react/select";
import { useStore } from "@/store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import { Switch, SwitchThumb } from "@/components/Switch";
import { decoders, type TextEncoding } from "@/utils/decoders";

const collection = createListCollection({
    items: decoders,
});

export const TextViewerSettings = () => {
    const encoding = useStore((s) => s.encoding);
    const setEncoding = useStore((s) => s.setEncoding);
    const breakSpaces = useStore((s) => s.breakSpaces);
    const setBreakSpaces = useStore((s) => s.setBreakSpaces);
    const select = useSelect({
        positioning: { sameWidth: true },
        collection: collection,
        onValueChange: ({ value }) => setEncoding(value[0] as TextEncoding),
        value: [encoding],
    });

    return (
        <div className="flex flex-col gap-4">
            <Select
                value={select as any} // eslint-disable-line
                className="flex w-full max-w-64 flex-col gap-2"
            >
                <SelectLabel>Encoding</SelectLabel>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-10">
                    {collection.items.map((item) => (
                        <SelectItem
                            className="data-[highlighted]:bg-brand data-[highlighted]:text-white"
                            key={item}
                            item={item}
                        >
                            <SelectItemText>{item}</SelectItemText>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
                <label htmlFor="text-viewer-break-spaces" className="text-sm">
                    Break spaces
                </label>
                <Switch
                    className="shrink-0"
                    id="text-viewer-break-spaces"
                    checked={breakSpaces}
                    onCheckedChange={setBreakSpaces}
                >
                    <SwitchThumb />
                </Switch>
            </div>
        </div>
    );
};
