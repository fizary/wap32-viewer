import { useRef } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Viewer, ViewerText } from "@/components/Viewer";
import { useAudio } from "./hooks";

export const AudioViewer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const error = useAudio(audioRef);

    return (
        <Viewer>
            {error && <ViewerText icon={AlertCircleIcon}>{error}</ViewerText>}
            <audio
                className={error ? "hidden" : "block"}
                ref={audioRef}
                controls
            />
        </Viewer>
    );
};
