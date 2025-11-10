import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface ButtonProps extends LinkProps{
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

export function LinkButton({children, variant='primary', ...rest}: ButtonProps){
    return(
        <Link 
            className={`group cursor-pointer w-full rounded-lg ${variant === 'primary' ? 'bg-white' : 'bg-blue-100'} text-primary shadow-2xl hover:shadow-md hover:brightness-90 hover:scale-95 py-2 px-6 font-black uppercase text-sm transition-all duration-300 whitespace-nowrap`} 
            {...rest}
        >
            {children}
        </Link>
    )
}