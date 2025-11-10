type Props = {
    progress: number;
}

export function ProgressBar({ progress = 0}: Props) {
    return (
        <div className="w-full flex flex-row gap-4 items-center">
            <div className="w-full  bg-blue-200 rounded-full h-6 dark:bg-slate-700 p-1">
                <div className="bg-primary h-full rounded-full transition-[width] duration-200 delay-500" 
                style={{ width: `${progress.toFixed(1)}%` }}
                />
            </div>
            <h1 className="font-bold">{progress.toFixed(1)}%</h1>
        </div>
    );
}