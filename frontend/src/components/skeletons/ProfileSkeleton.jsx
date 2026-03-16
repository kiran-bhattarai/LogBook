import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkeleton() {

    return (
        <div className="h-full bg-white/30 dark:bg-black/30">
            <div className="p-4 flex  items-center justify-center">
                <Skeleton className="h-20 w-20 rounded-full bg-neutral-400 dark:bg-neutral-500 mr-4" />
                <div className="">
                    <Skeleton className="h-8 w-56 bg-neutral-400 mb-1 dark:bg-neutral-500" />
                    <Skeleton className="h-5 w-58 bg-neutral-400 dark:bg-neutral-500" />
                </div>
            </div>
        </div>
    )
}