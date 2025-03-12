import { useState, useEffect, type RefObject } from "react";
import { parsePid, PID_FLAGS } from "wap32/pid";
import { useStore } from "@/store";
import { guessThePalette } from "@/utils/palettes";

export function useImage(canvasRef: RefObject<HTMLCanvasElement | null>) {
    const rezManager = useStore((s) => s.rezManager);
    const knownArchive = useStore((s) => s.knownArchive);
    const file = useStore((s) => s.file);
    const filePath = useStore((s) => s.filePath);
    const currentPalettePath = useStore((s) => s.currentPalettePath);
    const alwaysUseEmbeddedPalette = useStore(
        (s) => s.alwaysUseEmbeddedPalette,
    );
    const [error, setError] = useState<string>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const renderer = canvas?.getContext("2d");

        if (!canvas) return setError("Could not find the canvas element");
        if (!renderer) return setError("Could not retrieve the canvas context");

        if (file && file.content) {
            file.content.seek(0);

            // Parse PID format
            const pid = parsePid(file.content, file.content.view.byteLength);
            const { header, pixelData } = pid;
            let { palette } = pid;

            // Get external palette
            if (!palette || (!alwaysUseEmbeddedPalette && currentPalettePath)) {
                const palettePath = currentPalettePath
                    ? currentPalettePath
                    : guessThePalette(filePath, knownArchive);
                const paletteEntry = rezManager.getEntry(palettePath);

                if (!paletteEntry || paletteEntry.type !== "file")
                    return setError(
                        "Automatic palette selection failed, please select specific palette in the settings",
                    );

                palette = paletteEntry.content.view;
            }

            // Get transparency data
            const hasRLECompression = header.flags & PID_FLAGS.RLE_COMPRESSION;
            const hasTransparency = hasRLECompression
                ? true
                : Boolean(header.flags & PID_FLAGS.TRANSPARENT);
            const hasCustomTransparentIndex = header.flags & PID_FLAGS.KEYINDEX;
            const transparentIndex = hasCustomTransparentIndex
                ? header.userValue1 & 0xffff
                : 0;

            // Replace color indexes with actual rgba data
            const imageData = new ImageData(header.width, header.height);

            for (let i = 0; i < pixelData.length; i++) {
                const paletteOffset = pixelData[i] * 3;
                const imageOffset = i * 4;

                const r = palette[paletteOffset];
                const g = palette[paletteOffset + 1];
                const b = palette[paletteOffset + 2];

                // Captain Claw uses first palette index as transparent
                // Get Medieval and Gruntz transparency rules aren't clear yet
                // Seems like it uses `transparentIndex` for RLE and fixed `bright pink, rgb(255 0 132)` color for everything else
                if (hasTransparency) {
                    if (knownArchive === "captainclaw") {
                        if (pixelData[i] === 0) continue;
                    } else {
                        if (hasRLECompression) {
                            if (pixelData[i] === transparentIndex) continue;
                        } else if (r === 255 && g === 0 && b === 132) continue;
                    }
                }

                imageData.data[imageOffset] = r;
                imageData.data[imageOffset + 1] = g;
                imageData.data[imageOffset + 2] = b;
                imageData.data[imageOffset + 3] = 255;
            }

            // Setup canvas and render image
            canvas.width = header.width;
            canvas.height = header.height;
            renderer.putImageData(imageData, 0, 0);

            setError(undefined);
        }
    }, [
        canvasRef,
        rezManager,
        knownArchive,
        file,
        filePath,
        currentPalettePath,
        alwaysUseEmbeddedPalette,
    ]);

    return error;
}
