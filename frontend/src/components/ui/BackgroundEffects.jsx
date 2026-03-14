function BackgroundEffects() {

    return (
        <div className="absolute inset-0 -z-10 max-w-full m-auto">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/15 rounded-full blur-[120px]"></div>

            <div className="absolute top-[60%] left-[10%] w-80 h-80 bg-purple-500/40 dark:bg-purple-500/12 rounded-full blur-[120px]"></div>

            <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-cyan-500/40 dark:bg-cyan-500/12 rounded-full blur-[120px]"></div>

            <div className="absolute bottom-[5%] right-[5%] w-72 h-72 bg-emerald-500/40 dark:bg-emerald-500/12 rounded-full blur-[120px]"></div>

            <div className="absolute top-[45%] left-[45%] w-96 h-96 bg-indigo-500/38 dark:bg-indigo-500/12 rounded-full blur-[140px]"></div>

            <div className="absolute bottom-[30%] right-[30%] w-72 h-72 bg-green-400/40 dark:bg-green-400/12 rounded-full blur-[120px]"></div>
        </div>
    )
}

export default BackgroundEffects