import { Skeleton } from "@/components/ui/skeleton"
function LinechartSkeleton() {

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full flex justify-end">
            <Skeleton className="h-70 w-[calc(100%-40px)] bg-neutral-400 dark:bg-neutral-500" />
            </div>
            <Skeleton className="h-6 w-45 bg-neutral-400 mt-10 dark:bg-neutral-500" />
        </div>
    )
}

export default LinechartSkeleton