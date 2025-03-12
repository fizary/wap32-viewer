import { FolderArchiveIcon, FolderIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import { useLocationPicker } from "./hooks/useLocationPicker";

export const LocationPicker = () => {
    const { collection, select } = useLocationPicker();
    const [selectedPath] = select.value;

    return (
        <Select
            value={select as any} // eslint-disable-line
        >
            <VisuallyHidden>
                <SelectLabel>Location picker</SelectLabel>
            </VisuallyHidden>
            <SelectTrigger>
                {selectedPath === "/" ? (
                    <FolderArchiveIcon className="h-5" aria-hidden />
                ) : (
                    <FolderIcon className="h-5" aria-hidden />
                )}
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {collection.items.map((item) => (
                    <SelectItem key={item.value} item={item}>
                        {item.value === "/" ? (
                            <FolderArchiveIcon className="h-5" aria-hidden />
                        ) : (
                            <FolderIcon className="h-5" aria-hidden />
                        )}
                        <SelectItemText>{item.label}</SelectItemText>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
