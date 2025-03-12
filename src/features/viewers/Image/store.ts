import { type StateCreator } from "zustand";
import { type Store, type Mutators } from "@/store";

export type ImageViewerSlice = {
    currentPalettePath: string | undefined;
    alwaysUseEmbeddedPalette: boolean;
    setCurrentPalettePath: (currentPalettePath: string | undefined) => void;
    setAlwaysUseEmbeddedPalette: (alwaysUseEmbeddedPalette: boolean) => void;
};

export const createImageViewerSlice: StateCreator<
    Store,
    Mutators,
    [],
    ImageViewerSlice
> = (set) => ({
    currentPalettePath: undefined,
    alwaysUseEmbeddedPalette: true,

    setCurrentPalettePath: (currentPalettePath) =>
        set(
            { currentPalettePath },
            undefined,
            "ImageViewer/setCurrentPalettePath",
        ),

    setAlwaysUseEmbeddedPalette: (alwaysUseEmbeddedPalette) =>
        set(
            { alwaysUseEmbeddedPalette },
            undefined,
            "ImageViewr/setAlwaysUseEmbeddedPalette",
        ),
});
