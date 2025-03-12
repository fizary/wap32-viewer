import { useState } from "react";
import { useFileUpload } from "@ark-ui/react/file-upload";
import { useStore } from "@/store";
import { formatBytes } from "@/utils/formatters";

const maxFiles = 1;
const maxFileSize = 1_000_000_000; // 1GB

export function useUpload() {
    const loadArchive = useStore((s) => s.loadArchive);
    const [error, setError] = useState<string | undefined>(undefined);

    const fileUpload = useFileUpload({
        maxFiles: maxFiles,
        invalid: error !== undefined,
        onFileChange: ({ acceptedFiles, rejectedFiles }) => {
            const file = acceptedFiles[0];

            if (rejectedFiles.length > maxFiles)
                return setError(`Too many files, maximum ${maxFiles} allowed`);
            else if (file.size > maxFileSize)
                return setError(
                    `File too large, maximum size of ${formatBytes(maxFileSize)} allowed`,
                );

            loadArchive(file).catch((reason) => {
                setError("File has wrong format or its data is corrupted.");
                throw reason;
            });
        },
    });

    return { fileUpload, error };
}
