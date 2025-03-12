import { useRef } from "react";
import { createListCollection } from "@ark-ui/react/collection";
import { useSelect } from "@ark-ui/react/select";
import { useStore } from "@/store";

type CollectionItem = {
    label: string;
    value: string;
};

export function useLocationPicker() {
    const collection = useRef(
        createListCollection<CollectionItem>({ items: [] }),
    );
    const archive = useStore((s) => s.archive);
    const path = useStore((s) => s.path);
    const loadPath = useStore((s) => s.loadPath);
    let currentPath = "/";
    let currentElement = "";
    let sliceIndex = 1;

    // Add root path to collection
    collection.current.items = [{ label: archive!.name, value: "/" }];

    // Get collection items
    while (path.length > currentPath.length) {
        sliceIndex = path.indexOf("/", sliceIndex) + 1;

        if (sliceIndex < 1) break;

        currentElement = path.slice(currentPath.length, sliceIndex - 1);
        currentPath += currentElement + "/";

        collection.current.items.push({
            label: currentElement,
            value: currentPath,
        });
    }

    // Create select
    const select = useSelect({
        positioning: { sameWidth: true },
        collection: collection.current,
        onValueChange: ({ value }) => loadPath(value[0]),
        value: [path],
    });

    return { collection: collection.current, select };
}
