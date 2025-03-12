import { type Source } from "hexcod";

export const decoders = [
    "utf-8",
    "windows-1250",
    "windows-1251",
    "windows-1252",
] as const;
export type TextEncoding = (typeof decoders)[number];

type DecodersMap = Record<TextEncoding, TextDecoder>;
const decodersMap: DecodersMap = {} as DecodersMap;

for (const decoder of decoders) decodersMap[decoder] = new TextDecoder(decoder);

export function decode(
    source: Source,
    encoding: TextEncoding = "utf-8",
): string {
    return decodersMap[encoding].decode(source);
}
