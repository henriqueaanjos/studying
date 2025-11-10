import { Label } from "./ui/label";
import { Select as ShadCNSelect, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { SelectProps } from "@radix-ui/react-select";

interface SelectAlterProps extends SelectProps{
    label?: string;
    errors?: string;
    placelholder?: string;
    items?: {value: string; label: string}[];
}

export function Select({label, errors, placelholder, items, ...rest}: SelectAlterProps) {
    return (
        <div className="flex flex-col w-full items-start gap-2 relative">
            <Label htmlFor="input">{label}</Label>
            <ShadCNSelect  {...rest}>
                <SelectTrigger className={`w-full ${errors ? 'border-red-600 border-2' : ''}`}>
                    <SelectValue placeholder={placelholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {
                            items?.map(item => 
                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                            )
                        }
                    </SelectGroup>
                </SelectContent>
            </ShadCNSelect>
            <p className="text-red-600 text-xs mt-1 italic">{errors}</p>
        </div>
    );
}