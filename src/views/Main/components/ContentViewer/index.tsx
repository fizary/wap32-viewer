import { twMerge } from "tailwind-merge";
import { getEntryName } from "wap32/rez";
import { DownloadIcon, MousePointerClickIcon, XIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { FileInfo } from "@/components/FileInfo";
import { Viewer, ViewerText } from "@/components/Viewer";
import { useStore } from "@/store";
import { download } from "@/utils/download";
import {
    getFileType,
    getFileIconComponent,
    getFileViewerComponent,
} from "@/utils/files";
import { Settings } from "./components/Settings";

export const ContentViewer = () => {
    const file = useStore((s) => s.file);
    const closeFile = useStore((s) => s.closeFile);
    const IconComponent = getFileIconComponent(file);
    const ViewerComponent = getFileViewerComponent(file);

    const saveFile = () => {
        if (!file || !file.content) return;
        download([file.content.view], getEntryName(file));
    };

    return (
        <div
            className={twMerge(
                "fixed inset-0 flex flex-col gap-2 bg-zinc-950 p-2 md:left-[320px] md:translate-x-0 lg:left-[380px]",
                file ? "translate-x-0" : "translate-x-full",
            )}
        >
            {file ? (
                <>
                    <div className="flex justify-between gap-3 md:gap-5">
                        <FileInfo
                            icon={IconComponent}
                            name={getEntryName(file)}
                            size={file.content?.view.byteLength ?? 0}
                            lastModified={file.lastModified}
                        />
                        <div className="flex items-end gap-2">
                            <Button
                                onClick={saveFile}
                                aria-label="Download file"
                            >
                                <DownloadIcon className="h-5" aria-hidden />
                            </Button>
                            <Settings selectedFileType={getFileType(file)} />
                            <Button onClick={closeFile} aria-label="Close file">
                                <XIcon className="h-5" aria-hidden />
                            </Button>
                        </div>
                    </div>
                    <ViewerComponent />
                </>
            ) : (
                <Viewer>
                    <ViewerText icon={MousePointerClickIcon}>
                        Select a file to display its contents
                    </ViewerText>
                </Viewer>
            )}
        </div>
    );
};
