import { type LucideIcon } from "lucide-react";
import { formatBytes, formatDate } from "@/utils/formatters";

type FileInfoProps = {
    icon: LucideIcon;
    name: string;
    size: number;
    lastModified: Date;
};

export const FileInfo = ({
    icon: IconComponent,
    name,
    size,
    lastModified,
}: FileInfoProps) => {
    return (
        <div className="overflow-hidden">
            <div className="flex items-center gap-2.5 text-lg font-semibold">
                <IconComponent className="h-6 shrink-0" aria-hidden />
                <div className="overflow-hidden text-ellipsis text-nowrap font-outfit">
                    {name}
                </div>
            </div>
            <div className="overflow-hidden text-ellipsis text-nowrap text-sm text-zinc-500">
                {`${formatBytes(size)} | ${formatDate(lastModified)}`}
            </div>
        </div>
    );
};
