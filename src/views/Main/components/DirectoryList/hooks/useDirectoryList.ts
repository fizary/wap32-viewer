import { getParentPath, getEntryName } from "wap32/rez";
import { CornerUpLeftIcon, FolderIcon, type LucideIcon } from "lucide-react";
import { useStore } from "@/store";
import { getFileIconComponent } from "@/utils/files";

type CollectionItem = {
    icon: LucideIcon;
    name: string;
    path: string;
};

export function useDirectoryList() {
    const directory = useStore((s) => s.directory);
    const path = useStore((s) => s.path);

    // Initialize collection with optional back item
    const collection: CollectionItem[] =
        path.length > 1
            ? [
                  {
                      icon: CornerUpLeftIcon,
                      name: "..",
                      path: getParentPath(path),
                  },
              ]
            : [];

    // Get collection items
    for (const entry of directory?.content ?? []) {
        const entryName = getEntryName(entry);
        collection.push({
            icon:
                entry.type === "directory"
                    ? FolderIcon
                    : getFileIconComponent(entry),
            name: entryName,
            path: `${path}${entryName}/`,
        });
    }

    return {
        collection: collection,
        errorMessage:
            directory === undefined
                ? "Directory does not exist"
                : directory.content === undefined
                  ? "Directory not loaded properly"
                  : directory.content.length < 1
                    ? "Directory is empty"
                    : undefined,
    };
}
