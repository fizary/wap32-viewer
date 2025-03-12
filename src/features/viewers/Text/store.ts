import { type StateCreator } from "zustand";
import { type Store, type Mutators } from "@/store";
import { type TextEncoding } from "@/utils/decoders";

export type TextViewerSlice = {
    encoding: TextEncoding;
    breakSpaces: boolean;
    setEncoding: (encoding: TextEncoding) => void;
    setBreakSpaces: (breakSpaces: boolean) => void;
};

export const createTextViewerSlice: StateCreator<
    Store,
    Mutators,
    [],
    TextViewerSlice
> = (set) => ({
    encoding: "windows-1252",
    breakSpaces: true,

    setEncoding: (encoding) =>
        set({ encoding }, undefined, "TextViewer/setEncoding"),
    setBreakSpaces: (breakSpaces) =>
        set({ breakSpaces }, undefined, "TextViewer/setBreakSpaces"),
});
