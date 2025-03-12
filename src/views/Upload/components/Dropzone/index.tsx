import {
    FileUpload,
    type UseFileUploadReturn,
} from "@ark-ui/react/file-upload";
import { AlertCircleIcon, UploadIcon } from "lucide-react";

type DropzoneProps = {
    fileUpload: UseFileUploadReturn;
    error: string | undefined;
};

export const Dropzone = ({ fileUpload, error }: DropzoneProps) => {
    return (
        <FileUpload.RootProvider value={fileUpload} className="h-full w-full">
            <FileUpload.Dropzone className="flex h-full items-center justify-center rounded-sm border-2 border-dashed border-zinc-300 text-zinc-300 focus:outline-none focus-visible:border-solid focus-visible:!border-brand data-[dragging]:border-solid data-[dragging]:!border-brand data-[invalid]:border-red-400 data-[invalid]:text-red-400">
                <FileUpload.HiddenInput />
                <div className="flex flex-col items-center gap-4 p-3 text-center text-xl font-semibold">
                    {error !== undefined ? (
                        <>
                            <AlertCircleIcon className="size-12" aria-hidden />
                            <div>{error}</div>
                        </>
                    ) : (
                        <>
                            <UploadIcon className="size-12" aria-hidden />
                            <div>
                                Drag and drop file here or{" "}
                                <span className="text-brand underline">
                                    browse
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </FileUpload.Dropzone>
        </FileUpload.RootProvider>
    );
};
