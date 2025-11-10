import { GraduationCap } from "lucide-react";
import { Knewave } from "next/font/google";

const knewave = Knewave({
    variable: "--font-modak",
    subsets: ["latin"],
    weight: "400",
});

type LogoProps = {
    short?: boolean;
    size?: 'lg' | 'md' | 'sm';
}

export function Logo({short = false, size='md'}: LogoProps) {
    const iconSize = size === 'lg' ? 64 : size === 'sm' ? 24 : 32;
    const textSize = size === 'lg' ? 'text-6xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
    return (
        <div className="flex flex-row items-center justify-start">
            <GraduationCap size={iconSize} color="white" strokeWidth={3} />
            <span className={` ${short && 'hidden'} ${knewave.className} text-white ${textSize}`}>Studying</span>
        </div>
    )
}