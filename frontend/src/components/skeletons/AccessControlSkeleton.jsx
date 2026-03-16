import { Skeleton } from "@/components/ui/skeleton"

function AccessControlSkeleton() {
    
    return (
        <div className="border-b border-neutral-500 flex flex-col rounded bg-white/5 dark:bg-[#202023]/30 pb-1 px-3 pr-2 sm:pr-3 items-center w-full text-black dark:text-white">

            <div className="flex justify-between w-full">
                <div className="sm:flex-row flex justify-between items-start sm:items-center flex-col w-full">
                    <div className="flex mt-1">
                        <div className="flex items-center font-poppins pt-1">
                            <Skeleton className="h-10 w-10 rounded-full bg-neutral-400 dark:bg-neutral-500 mr-2" />
                            <div className="space-y-2">
                                <Skeleton className="h-5.5 w-40 bg-neutral-400 dark:bg-neutral-500" />
                                <Skeleton className="h-4 w-50 bg-neutral-400 dark:bg-neutral-500" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-[14.5px] mt-4.5 sm:mt-1.5 text-black dark:text-white space-y-1.5">
                        <Skeleton className="h-4 w-34 bg-neutral-400 dark:bg-neutral-500" />
                        <Skeleton className="h-4 w-62 bg-neutral-400 dark:bg-neutral-500" />
                    </div>
                </div>

                <div className="mt-2 md:ml-4 ml-2 h-min mr-3">
                    <Skeleton className="h-7 w-16 bg-neutral-400 dark:bg-neutral-500" />
                </div>
            </div>

            <div className="w-full mt-4">
                <div className="flex text-md font-medium gap-1 w-full whitespace-nowrap flex-wrap">
                    <div className="flex-1 flex items-center justify-center gap-1">
                        <Skeleton className="h-7 bg-neutral-400 dark:bg-neutral-500 flex-1 rounded px-2 pb-1 py-0.5" />
                        <Skeleton className="h-7 bg-neutral-400 dark:bg-neutral-500 flex-1 rounded px-2 pb-1 py-0.5" />
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1">
                        <Skeleton className="h-7 bg-neutral-400 dark:bg-neutral-500 flex-1 rounded px-2 pb-1 py-0.5" />
                        <Skeleton className="h-7 bg-neutral-400 dark:bg-neutral-500 flex-1 rounded px-2 pb-1 py-0.5" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessControlSkeleton