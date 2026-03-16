import { Skeleton } from "@/components/ui/skeleton"


function DataSkeleton({className}) {

    return (
        <Skeleton className={`h-8 w-46 bg-neutral-400 dark:bg-neutral-500 ${className}`} />
    )
}

export default DataSkeleton