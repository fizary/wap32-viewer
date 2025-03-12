import { useState, useEffect, type RefObject } from "react";
import { useStore } from "@/store";

export function useAudio(audioRef: RefObject<HTMLAudioElement | null>) {
    const file = useStore((s) => s.file);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!audioRef.current)
            return setError("Could not find the audio element");

        let objectUrl = "";
        if (file && file.content) {
            const blob = new Blob([file.content.view]);
            objectUrl = URL.createObjectURL(blob);

            audioRef.current.src = objectUrl;
        }

        setError(undefined);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file, audioRef]);

    return error;
}
