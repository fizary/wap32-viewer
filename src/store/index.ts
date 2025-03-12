import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BinaryStream } from "hexcod";
import { createArchiveSlice, type ArchiveSlice } from "./archive";
import {
    createImageViewerSlice,
    type ImageViewerSlice,
} from "@/features/viewers/Image/store";
import {
    createTextViewerSlice,
    type TextViewerSlice,
} from "@/features/viewers/Text/store";

export type Store = ArchiveSlice & ImageViewerSlice & TextViewerSlice;
export type Mutators = [["zustand/devtools", never]];

export const useStore = create<Store>()(
    devtools(
        (...args) => ({
            ...createArchiveSlice(...args),
            ...createImageViewerSlice(...args),
            ...createTextViewerSlice(...args),
        }),
        {
            enabled: import.meta.env.DEV,
            serialize: {
                // Fix app freeze while devtools are enabled with custom data serializatin
                replacer: (_: string, value: unknown) =>
                    value instanceof BinaryStream ? "[REDACTED]" : value,
            },
        },
    ),
);
