import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpenCheck, BookOpenText, FileClock } from "lucide-react";

export function getStageIcon(stageName: string) {
    switch (stageName.toLowerCase()) {
        case 'estudo':
            return <Tooltip>
                <TooltipTrigger>
                    <BookOpenText />
                </TooltipTrigger>
                <TooltipContent>
                    {stageName}
                </TooltipContent>
            </Tooltip>;
        case 'revisão':
            return <Tooltip>
                <TooltipTrigger>
                    <FileClock />
                </TooltipTrigger>
                <TooltipContent>
                    {stageName}
                </TooltipContent>
            </Tooltip>;
        case 'prática':
            return <Tooltip>
                <TooltipTrigger>
                    <BookOpenCheck />
                </TooltipTrigger>
                <TooltipContent>
                    {stageName}
                </TooltipContent>
            </Tooltip>;
        default:
            return <></>;
    }
}