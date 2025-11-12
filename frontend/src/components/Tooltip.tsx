import { Tooltip as ShadCNTooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function Tooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
    return (
        <ShadCNTooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>
                <span>
                    {content}
                </span>
            </TooltipContent>
        </ShadCNTooltip>
    );
}