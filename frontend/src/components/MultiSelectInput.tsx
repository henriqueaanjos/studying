import { useState } from "react";
import { Label } from "./ui/label";
import { Input as ShadCNInput } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

interface InputProps{
    label: string,
    placeholder?: string,
    errors?: string,
    value?: string[],
    onChange?: (value: string[]) => void
}

export function MultiSelectInput({ label, placeholder, errors, value, onChange }: InputProps) {
    const [valueText, setValueText] = useState('');
    const [contents, setContents] = useState<string[]>(value ?? []);

    function handleAddContent() {
        if (valueText.trim() === '')
            return;
        setContents(old => [...old, valueText.trim()]);
        setValueText('');
        onChange([...contents, valueText.trim()]);
    }
    function handleRemoveContent(indexToRemove: number) {
        onChange(contents.filter((_, index) => index !== indexToRemove));
        setContents(old => old.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className="flex flex-col w-full items-start gap-2 relative">
            <Label htmlFor="input">{label}</Label>
            <div className="w-full flex flex-row gap-1 items-center justify-between">
                <ShadCNInput
                    id="input"
                    type='text'
                    value={valueText}
                    onChange={(e) => setValueText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddContent();
                        }
                    }}
                    placeholder={placeholder}
                    className={`${errors && 'border-red-600 border-2'}`}
                />
                <Button variant='outline' type='button' onClick={handleAddContent}>
                    <Plus size={16} className="text-primary" />
                </Button>
            </div>
            <div className="w-full flex flex-row flex-wrap gap-2">
                {contents.map((content, index) => (
                  <div
                    key={index}
                    className="relative group flex items-center justify-center"
                  >
                    <span className="px-3 py-1 bg-slate-200 text-slate-500 dark:bg-slate-700 dark:hover:text-white hover:text-slate-900 rounded-full text-sm relative">
                      {content}
                      <button
                        type="button"
                        onClick={() => handleRemoveContent(index)}
                        className="absolute -top-1 -right-1 hidden group-hover:flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full"
                      >
                        <Minus size={10} />
                      </button>
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-red-600 text-xs mt-1 italic">{errors}</p>
        </div>
    )
}