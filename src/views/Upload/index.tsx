import { Dropzone } from "./components/Dropzone";
import { useUpload } from "./hooks/useUpload";

export const UploadView = () => {
    const { fileUpload, error } = useUpload();

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            className="flex h-screen w-screen flex-col gap-5 p-2"
        >
            <div className="py-10 text-center">
                <div className="font-outfit text-4xl">WAP32 Viewer</div>
                <div className="text-lg text-zinc-400">
                    Open archive file (.rez) to browse its contents
                </div>
            </div>
            <div className="grow">
                <Dropzone fileUpload={fileUpload} error={error} />
            </div>
        </div>
    );
};
