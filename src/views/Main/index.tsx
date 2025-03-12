import { FolderArchiveIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { FileInfo } from "@/components/FileInfo";
import { useStore } from "@/store";
import { ContentViewer } from "./components/ContentViewer";
import { DirectoryList } from "./components/DirectoryList";
import { LocationPicker } from "./components/LocationPicker";

export const MainView = () => {
    const rezManager = useStore((s) => s.rezManager);
    const archive = useStore((s) => s.archive);
    const closeArchive = useStore((s) => s.closeArchive);

    return archive === undefined ? null : (
        <>
            <div className="fixed inset-0 flex w-full flex-col md:max-w-[320px] lg:max-w-[380px]">
                <div className="flex flex-col gap-5 bg-zinc-950 px-3 py-2">
                    <div className="flex items-center justify-between gap-2 md:gap-5">
                        <FileInfo
                            icon={FolderArchiveIcon}
                            name={archive.name}
                            size={archive.size}
                            lastModified={rezManager.header.lastModified}
                        />
                        <Button
                            className="size-10 shrink-0"
                            onClick={closeArchive}
                            aria-label="Upload new archive"
                        >
                            <UploadIcon className="h-5" aria-hidden />
                        </Button>
                    </div>
                    <LocationPicker />
                </div>
                <div className="grow overflow-hidden px-3 py-2">
                    <DirectoryList />
                </div>
            </div>
            <ContentViewer />
        </>
    );
};
