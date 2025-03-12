import { type JSX } from "react";
import { type RezFile } from "wap32/rez";
import {
    BracesIcon,
    FileIcon,
    ImageIcon,
    MusicIcon,
    TypeIcon,
    type LucideIcon,
} from "lucide-react";
import { AudioViewer, AudioViewerSettings } from "@/features/viewers/Audio";
import { ImageViewer, ImageViewerSettings } from "@/features/viewers/Image";
import { NotSupportedViewer } from "@/features/viewers/NotSupported";
import { TextViewer, TextViewerSettings } from "@/features/viewers/Text";

export type KnownArchives = "captainclaw" | "getmedieval" | "gruntz";

export type KnownFileExtensions =
    | "ANI"
    | "PAL"
    | "PCX"
    | "PID"
    | "TXT"
    | "WAV"
    | "WWD"
    | "XMI";

export type KnownFileTypes = "audio" | "image" | "json" | "text";

const extensionTypeMap: Record<
    KnownFileExtensions,
    KnownFileTypes | undefined
> = {
    ANI: "json",
    PAL: "image",
    PCX: "image",
    PID: "image",
    TXT: "text",
    WAV: "audio",
    WWD: "json",
    XMI: "audio",
};

const typeIconMap: Record<KnownFileTypes, LucideIcon | undefined> = {
    audio: MusicIcon,
    image: ImageIcon,
    json: BracesIcon,
    text: TypeIcon,
};

const extensionViewerMap: Record<
    KnownFileExtensions,
    (() => JSX.Element) | undefined
> = {
    ANI: undefined,
    PAL: undefined,
    PCX: undefined,
    PID: ImageViewer,
    TXT: TextViewer,
    WAV: AudioViewer,
    WWD: undefined,
    XMI: undefined,
};

export const settingsComponents: [KnownFileTypes, () => JSX.Element][] = [
    ["audio", AudioViewerSettings],
    ["image", ImageViewerSettings],
    ["text", TextViewerSettings],
];

export function getFileType(file?: RezFile) {
    return extensionTypeMap[file?.extension as KnownFileExtensions];
}

export function getFileIconComponent(file?: RezFile) {
    const type = extensionTypeMap[file?.extension as KnownFileExtensions];
    return (type && typeIconMap[type]) ?? FileIcon;
}

export function getFileViewerComponent(file?: RezFile) {
    return (
        extensionViewerMap[file?.extension as KnownFileExtensions] ??
        NotSupportedViewer
    );
}
