import { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
}

export function StatisticsCard({ title, children }: Props) {
    return (
        <div className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-lg  gap-4 relative pt-8">
            <div className="absolute top-0 px-2 rounded-b-md bg-primary">
                <span className="text-xxs uppercase font-black text-white whitespace-nowrap text-ellipsis">{title}</span>
            </div>
            <div className="w-full flex  h-full justify-center items-center">
                {children}
            </div>
        </div>
    )
}