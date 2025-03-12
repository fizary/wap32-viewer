import { useEffect } from "react";
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
import { getAvailablePalettes } from "@/utils/palettes";

const collection = createListCollection<string[]>({
    items: [["Auto", ""]],
    itemToString: (item) => item[0],
    itemToValue: (item) => item[1],
});

export const ImageViewerSettings = () => {
    const knownArchive = useStore((s) => s.knownArchive);
    const currentPalettePath = useStore((s) => s.currentPalettePath);
    const setCurrentPalettePath = useStore((s) => s.setCurrentPalettePath);
    const alwaysUseEmbeddedPalette = useStore(
        (s) => s.alwaysUseEmbeddedPalette,
    );
    const setAlwaysUseEmbeddedPalette = useStore(
        (s) => s.setAlwaysUseEmbeddedPalette,
    );
    const select = useSelect({
        positioning: { sameWidth: true },
        collection: collection,
        onValueChange: ({ value }) =>
            setCurrentPalettePath(value[0] === "" ? undefined : value[0]),
        value: [currentPalettePath ?? ""],
    });

    useEffect(() => {
        collection.items = [
            ["Auto", ""],
            ...getAvailablePalettes(knownArchive),
        ];
    }, [knownArchive]);

    return (
        <div className="flex flex-col gap-4">
            <Select
                value={select as any} // eslint-disable-line
                className="flex w-full max-w-64 flex-col gap-2"
            >
                <SelectLabel>Palette</SelectLabel>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-10 max-h-80 overflow-auto">
                    {collection.items.map((item) => (
                        <SelectItem
                            className="data-[highlighted]:bg-brand data-[highlighted]:text-white"
                            key={item[1]}
                            item={item}
                        >
                            <SelectItemText>{item[0]}</SelectItemText>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
                <label
                    htmlFor="image-viewer-always-use-embedded-palette"
                    className="text-sm"
                >
                    Always use embedded palette
                </label>
                <Switch
                    className="shrink-0"
                    id="image-viewer-always-use-embedded-palette"
                    checked={alwaysUseEmbeddedPalette}
                    onCheckedChange={setAlwaysUseEmbeddedPalette}
                >
                    <SwitchThumb />
                </Switch>
            </div>
        </div>
    );
};
