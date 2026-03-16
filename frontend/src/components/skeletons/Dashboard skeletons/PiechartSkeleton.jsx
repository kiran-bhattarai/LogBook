import { Skeleton } from "@/components/ui/skeleton"

function PiechartSkeleton() {

    return (
        <div className="flex flex-col items-center">
            <div className="w-75 h-77.5 flex flex-col items-center pt-9">
                <Skeleton className="h-50 w-50 rounded-full bg-neutral-400 mb-10 dark:bg-neutral-500" />
                <Skeleton className="h-5 w-30 bg-neutral-400 dark:bg-neutral-500" />
            </div>
            <Skeleton className="h-6 w-45 bg-neutral-400 mt-6 dark:bg-neutral-500" />
        </div>
    )
}

export default PiechartSkeleton