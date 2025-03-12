import { type StateCreator } from "zustand";
import { BinaryStream } from "hexcod";
import {
    RezManager,
    getParentPath,
    type RezDirectory,
    type RezFile,
} from "wap32/rez";
import { type Store, type Mutators } from "@/store";
import { type KnownArchives } from "@/utils/files";

export type ArchiveSlice = {
    rezManager: RezManager;
    knownArchive: KnownArchives | undefined;
    archive: File | undefined;
    path: string;
    filePath: string;
    directory: RezDirectory | undefined;
    file: RezFile | undefined;
    loadPath: (targetPath: string) => void;
    loadArchive: (file: File, targetPath?: string) => Promise<void>;
    identifyArchive: () => void;
    closeArchive: () => void;
    closeFile: () => void;
};

export const createArchiveSlice: StateCreator<
    Store,
    Mutators,
    [],
    ArchiveSlice
> = (set) => ({
    rezManager: new RezManager(),
    knownArchive: undefined,
    archive: undefined,
    path: "",
    filePath: "",
    directory: undefined,
    file: undefined,

    loadPath: (targetPath) =>
        set(
            (state) => {
                if (targetPath === state.path) return state;

                const entry = state.rezManager.getEntry(targetPath);

                if (entry && entry.type === "file") {
                    const parentPath = getParentPath(targetPath);
                    const parentEntry = state.rezManager.getEntry(parentPath);

                    if (!parentEntry || parentEntry.type === "file")
                        throw new Error(
                            `Expected "${parentPath}" to be a directory entry`,
                        );

                    return {
                        path: parentPath,
                        filePath: targetPath,
                        directory: parentEntry,
                        file: entry,
                    };
                }

                return { path: targetPath, directory: entry };
            },
            undefined,
            "Archive/loadPath",
        ),

    loadArchive: async (file) => {
        const buffer = await file.arrayBuffer();
        const stream = new BinaryStream(buffer);

        set(
            (state) => {
                state.rezManager.init(stream);
                state.loadPath("/");
                state.identifyArchive();

                return {
                    archive: file,
                };
            },
            undefined,
            "Archive/loadArchive",
        );
    },

    identifyArchive: () =>
        set(
            (state) => {
                const entryNames = (state.directory?.content ?? []).map(
                    (entry) => entry.name,
                );

                return {
                    knownArchive: entryNames.includes("LEVEL1")
                        ? "captainclaw"
                        : entryNames.includes("DUNGEON1")
                          ? "getmedieval"
                          : entryNames.includes("AREA1")
                            ? "gruntz"
                            : undefined,
                };
            },
            undefined,
            "Archive/identifyArchive",
        ),

    closeArchive: () =>
        set(
            (state) => {
                state.rezManager.init();
                return {
                    archive: undefined,
                    knownArchive: undefined,
                    path: "",
                    filePath: "",
                    directory: undefined,
                    file: undefined,
                    currentPalettePath: undefined,
                };
            },
            undefined,
            "Archive/closeArchive",
        ),

    closeFile: () =>
        set(
            () => ({ filePath: "", file: undefined }),
            undefined,
            "Archive/closeFile",
        ),
});
