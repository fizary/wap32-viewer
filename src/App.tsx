import { useStore } from "@/store";
import { MainView } from "@/views/Main";
import { UploadView } from "@/views/Upload";

export const App = () => {
    const archive = useStore((s) => s.archive);

    return archive ? <MainView /> : <UploadView />;
};
