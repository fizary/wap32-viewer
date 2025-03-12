import { type KnownArchives } from "./files";

const captainClawPalettes = [
    ["ROLLER", "/STATES/ROLLER/PALETTES/ROLLER.PAL"],
    ["BACKGND", "/STATES/RACING/PALETTES/BACKGND.PAL"],
    ["STATS", "/STATES/RACING/PALETTES/STATS.PAL"],
    ["LEVEL1", "/LEVEL1/PALETTES/MAIN.PAL"],
    ["LEVEL2", "/LEVEL2/PALETTES/MAIN.PAL"],
    ["LEVEL3", "/LEVEL3/PALETTES/MAIN.PAL"],
    ["LEVEL4", "/LEVEL4/PALETTES/MAIN.PAL"],
    ["LEVEL5", "/LEVEL5/PALETTES/MAIN.PAL"],
    ["LEVEL6", "/LEVEL6/PALETTES/MAIN.PAL"],
    ["LEVEL7", "/LEVEL7/PALETTES/MAIN.PAL"],
    ["LEVEL8", "/LEVEL8/PALETTES/MAIN.PAL"],
    ["LEVEL9", "/LEVEL9/PALETTES/MAIN.PAL"],
    ["LEVEL10", "/LEVEL10/PALETTES/MAIN.PAL"],
    ["LEVEL11", "/LEVEL11/PALETTES/MAIN.PAL"],
    ["LEVEL12", "/LEVEL12/PALETTES/MAIN.PAL"],
    ["LEVEL13", "/LEVEL13/PALETTES/MAIN.PAL"],
    ["LEVEL14", "/LEVEL14/PALETTES/MAIN.PAL"],
];

const getMedievalPalettes = [
    ["DUNGEON1", "/DUNGEON1/PALETTES/MAIN.PAL"],
    ["DUNGEON2", "/DUNGEON2/PALETTES/MAIN.PAL"],
    ["DUNGEON3", "/DUNGEON3/PALETTES/MAIN.PAL"],
    ["DUNGEON4", "/DUNGEON4/PALETTES/MAIN.PAL"],
    ["DUNGEON5", "/DUNGEON5/PALETTES/MAIN.PAL"],
    ["DUNGEON6", "/DUNGEON6/PALETTES/MAIN.PAL"],
    ["DUNGEON7", "/DUNGEON7/PALETTES/MAIN.PAL"],
    ["DUNGEON8", "/DUNGEON8/PALETTES/MAIN.PAL"],
];

const gruntzPalettes = [
    ["BLACKTOOL", "/GRUNTZ/PALETTEZ/BLACKTOOL.PAL"],
    ["BLACKTOY", "/GRUNTZ/PALETTEZ/BLACKTOY.PAL"],
    ["BLUETOOL", "/GRUNTZ/PALETTEZ/BLUETOOL.PAL"],
    ["BLUETOY", "/GRUNTZ/PALETTEZ/BLUETOY.PAL"],
    ["CYANTOOL", "/GRUNTZ/PALETTEZ/CYANTOOL.PAL"],
    ["CYANTOY", "/GRUNTZ/PALETTEZ/CYANTOY.PAL"],
    ["DKBLUETOOL", "/GRUNTZ/PALETTEZ/DKBLUETOOL.PAL"],
    ["DKBLUETOY", "/GRUNTZ/PALETTEZ/DKBLUETOY.PAL"],
    ["DKGREENTOOL", "/GRUNTZ/PALETTEZ/DKGREENTOOL.PAL"],
    ["DKGREENTOY", "/GRUNTZ/PALETTEZ/DKGREENTOY.PAL"],
    ["DKREDTOOL", "/GRUNTZ/PALETTEZ/DKREDTOOL.PAL"],
    ["DKREDTOY", "/GRUNTZ/PALETTEZ/DKREDTOY.PAL"],
    ["DKYELLOWTOOL", "/GRUNTZ/PALETTEZ/DKYELLOWTOOL.PAL"],
    ["DKYELLOWTOY", "/GRUNTZ/PALETTEZ/DKYELLOWTOY.PAL"],
    ["GREENTOOL", "/GRUNTZ/PALETTEZ/GREENTOOL.PAL"],
    ["GREENTOY", "/GRUNTZ/PALETTEZ/GREENTOY.PAL"],
    ["GREYTOOL", "/GRUNTZ/PALETTEZ/GREYTOOL.PAL"],
    ["GREYTOY", "/GRUNTZ/PALETTEZ/GREYTOY.PAL"],
    ["HOTPINKTOOL", "/GRUNTZ/PALETTEZ/HOTPINKTOOL.PAL"],
    ["HOTPINKTOY", "/GRUNTZ/PALETTEZ/HOTPINKTOY.PAL"],
    ["ORANGETOOL", "/GRUNTZ/PALETTEZ/ORANGETOOL.PAL"],
    ["ORANGETOY", "/GRUNTZ/PALETTEZ/ORANGETOY.PAL"],
    ["PINKTOOL", "/GRUNTZ/PALETTEZ/PINKTOOL.PAL"],
    ["PINKTOY", "/GRUNTZ/PALETTEZ/PINKTOY.PAL"],
    ["PURPLETOOL", "/GRUNTZ/PALETTEZ/PURPLETOOL.PAL"],
    ["PURPLETOY", "/GRUNTZ/PALETTEZ/PURPLETOY.PAL"],
    ["REDTOOL", "/GRUNTZ/PALETTEZ/REDTOOL.PAL"],
    ["REDTOY", "/GRUNTZ/PALETTEZ/REDTOY.PAL"],
    ["TOOL", "/GRUNTZ/PALETTEZ/TOOL.PAL"],
    ["TOY", "/GRUNTZ/PALETTEZ/TOY.PAL"],
    ["TURQTOOL", "/GRUNTZ/PALETTEZ/TURQTOOL.PAL"],
    ["TURQTOY", "/GRUNTZ/PALETTEZ/TURQTOY.PAL"],
    ["WHITETOOL", "/GRUNTZ/PALETTEZ/WHITETOOL.PAL"],
    ["WHITETOY", "/GRUNTZ/PALETTEZ/WHITETOY.PAL"],
    ["YELLOWTOOL", "/GRUNTZ/PALETTEZ/YELLOWTOOL.PAL"],
    ["YELLOWTOY", "/GRUNTZ/PALETTEZ/YELLOWTOY.PAL"],
];

export function getAvailablePalettes(
    knownArchive: KnownArchives | undefined,
): string[][] {
    return knownArchive === "captainclaw"
        ? captainClawPalettes
        : knownArchive === "getmedieval"
          ? getMedievalPalettes
          : knownArchive === "gruntz"
            ? gruntzPalettes
            : [];
}

export function guessThePalette(
    imagePath: string,
    knownArchive: KnownArchives | undefined,
): string {
    const availablePalettes = getAvailablePalettes(knownArchive);
    const sliceIndex = imagePath.indexOf("/", 1);
    const identifier = sliceIndex >= 0 ? imagePath.slice(1, sliceIndex) : "";
    const palette = availablePalettes.find(
        (palette) => palette[0] === identifier,
    );

    return palette ? palette[1] : "";
}
