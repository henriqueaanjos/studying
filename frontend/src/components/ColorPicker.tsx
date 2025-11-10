import { getTextColor } from "@/utils/getTextColor";
import { Label } from "./ui/label";
import { TwitterPicker, TwitterPickerProps } from 'react-color';

interface ColorPickerAlterProps extends TwitterPickerProps {
    label?: string;
    errors?: string;
    placeholder?: string;
}

export function ColorPicker({ label, errors, placeholder, color, ...rest }: ColorPickerAlterProps) {
    return (
        <div className="flex flex-col w-full items-start gap-2 relative" >
            <Label htmlFor="input">{label}</Label>
            <div className="w-full shadow-2xl rounded-lg border border-border">
                <div className="w-full h-36 rounded-t-lg flex flex-col items-center justify-center"
                    style={{ backgroundColor: color.toString() }}
                >
                    <h1 className={`font-bold`}
                        style={{
                            color: getTextColor(color.toString()) === 'white' ? 'white' : 'black',
                        }}
                    >{placeholder}</h1>
                    <h5 className="font-thin"
                        style={{
                            color: getTextColor(color.toString()) === 'white' ? 'white' : 'black',
                        }}
                    >({color.toString()})</h5>
                </div>
                <TwitterPicker
                    width="100%"
                    triangle="hide"
                    colors={'#ff6900,#fcb900,#7bdcb5,#00d084,#8ed1fc,#0693e3,#abb8c3,#eb144c,#f78da7,#9900ef,#000000,#ffffff'.split(',')}
                    styles={{
                        default: {
                            card: {
                                backgroundColor: 'var(--transparent)',
                                boxShadow: 'none',
                                borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                                border: '1px solid var(--input)',
                            },
                            swatch: {
                                marginRight: '0.25rem',
                                border: '1px solid var(--border)',
                            },
                        },
                    }}
                    color={color}
                    {...rest}
                />
            </div>
            <p className="text-red-600 text-xs mt-1 italic">{errors}</p>
        </div>
    )
}