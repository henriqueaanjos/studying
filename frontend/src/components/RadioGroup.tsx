import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { Label } from "./ui/label";
import { RadioGroup as ShadCNRadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ReactNode } from "react";

interface RadioGroupAlterProps extends RadioGroupProps {
    label?: string;
    errors?: string;
    direction?: 'horizontal' | 'vertical';
    items?: { value: string; label: string, icon?: ReactNode }[];
}

export function RadioGroup({ label, errors, items, direction = 'vertical', ...rest }: RadioGroupAlterProps) {
    return (
        <div className="flex flex-col w-full items-start gap-2 relative">
            <Label htmlFor="input">{label}</Label>
            <ShadCNRadioGroup defaultValue="option-one" className={`w-full flex items-center justify-center gap-2 mt-2 ${direction === 'horizontal' ? 'flex-row justify-evenly' : 'flex-col'}`} {...rest}>
                {
                    items?.map(item =>
                        <div key={item.value} className={`flex items-center space-x-2 ${errors && 'text-red-600'}`}>
                            <RadioGroupItem value={item.value} id={item.value}  className={`${errors && 'border-2 border-red-600'}`}/>
                            <Label htmlFor={item.value}>
                                {item.icon}
                                {item.label}
                            </Label>
                        </div>
                    )
                }
            </ShadCNRadioGroup>
            <p className="text-red-600 text-xs mt-1 italic">{errors}</p>
        </div>
    )
}