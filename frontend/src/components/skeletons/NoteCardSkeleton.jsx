import { Skeleton } from "@/components/ui/skeleton"
import { randomInt } from "@/utils/random"
import { useMemo } from "react";

export default function NoteCardSkeleton({type = "home"}) {

    const val1 = useMemo(() => randomInt(20, 90), []);
    const val2 = useMemo(() => randomInt(1, 5), [])


    return (
        <div className="p-2 pb-0 border space-y-2 max-w-140 relative rounded-2xl border-neutral-700 dark:shadow-neutral-700 dark:hover:border-neutral-100 hover:scale-101 dark:border-neutral-500 hover:shadow-[0_0px_10px_rgba(255,255,255,0.35)] transition duration-300 min-h-35 bg-neutral-100/30 dark:bg-white/5 flex flex-col">

            <Skeleton className={`h-6 bg-neutral-400 dark:bg-neutral-500`} style={{ width: `${val1}%` }} />

            <span className="border border-x-0 border-b-0 border-t-neutral-700 w-full py-0.5 block" />

            <div className="flex-1 space-y-2">
                {
                    Array.from({ length: val2 }).map((_, i) => {
                        return <Skeleton key={i} className="h-4 w-[95%] bg-neutral-400 dark:bg-neutral-500" />
                    })
                }
            </div>

            <div className={`border border-x-0 border-b-0 border-t-neutral-700 flex w-full items-center ${type === "home" ? "space-x-20" : "space-x-30"} py-2`}>
                <Skeleton className="h-3 w-50 bg-neutral-400 dark:bg-neutral-500" />
                {
                    type === "home" &&
                    <Skeleton className="h-3 w-45 bg-neutral-400 dark:bg-neutral-500" />
                }
                <Skeleton className="h-3 w-70 bg-neutral-400 dark:bg-neutral-500" />
            </div>
        </div >
    )
}