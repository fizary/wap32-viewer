import { AlertCircleIcon } from "lucide-react";
import { Viewer, ViewerText } from "@/components/Viewer";

export const NotSupportedViewer = () => {
    return (
        <Viewer>
            <ViewerText icon={AlertCircleIcon}>
                Preview for this file type is unavailable
            </ViewerText>
        </Viewer>
    );
};
