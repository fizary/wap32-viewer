import { SettingsIcon, XIcon } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/Accordion";
import { Button } from "@/components/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog";
import { settingsComponents, type KnownFileTypes } from "@/utils/files";

type SettingsProps = {
    selectedFileType: KnownFileTypes | undefined;
};

export const Settings = ({ selectedFileType }: SettingsProps) => {
    const sortedSettingsComponents = [...settingsComponents].sort((a, b) =>
        a[0] === selectedFileType ? -1 : b[0] === selectedFileType ? 1 : 0,
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button aria-label="Open settings">
                    <SettingsIcon className="h-5" aria-hidden />
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className="flex flex-col gap-3">
                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col gap-1">
                            <DialogTitle>Settings</DialogTitle>
                            <DialogDescription>
                                Customize settings for different format viewers.
                            </DialogDescription>
                        </div>
                        <DialogClose asChild>
                            <Button
                                className="size-7 shrink-0 p-0"
                                aria-label="Close dialog"
                            >
                                <XIcon className="h-5" aria-hidden />
                            </Button>
                        </DialogClose>
                    </div>
                    <Accordion
                        type="multiple"
                        orientation="vertical"
                        defaultValue={[selectedFileType ?? ""]}
                    >
                        {sortedSettingsComponents.map(
                            ([type, SettingsComponent]) => (
                                <AccordionItem key={type} value={type}>
                                    <AccordionTrigger>{type}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-5 py-2">
                                            <SettingsComponent />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ),
                        )}
                    </Accordion>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
