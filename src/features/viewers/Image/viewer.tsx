import { useRef } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Viewer, ViewerText } from "@/components/Viewer";
import { useImage } from "./hooks";

export const ImageViewer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const error = useImage(canvasRef);

    return (
        <Viewer>
            {error && <ViewerText icon={AlertCircleIcon}>{error}</ViewerText>}
            <canvas className={error ? "hidden" : "block"} ref={canvasRef} />
        </Viewer>
    );
};
