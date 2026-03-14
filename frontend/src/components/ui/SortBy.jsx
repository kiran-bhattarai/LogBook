
function SortBy({ sortId, setSortId }) {

    return (
        <div className="rounded py-1 font-inter">
            <label htmlFor="sort" className="text-black dark:text-white text-xl" >Sort by: &nbsp;</label>
            <select value={sortId} name="" id="sort" className="text-black dark:text-white sm:text-lg text-[15px] outline-none bg-transparent cursor-pointer" onChange={(e) => setSortId(parseInt(e.target.value))}>
                <option value="1" className="bg-white dark:bg-black">Date (Newest first)</option>
                <option value="2" className="bg-white dark:bg-black">Date (Oldest first)</option>
                <option value="3" className="bg-white dark:bg-black">Alphabetical</option>
                <option value="4" className="bg-white dark:bg-black">Alphabetical reverse</option>
                <option value="5" className="bg-white dark:bg-black">Characters (Most first)</option>
                <option value="6" className="bg-white dark:bg-black">Characters (Least first)</option>
            </select>
        </div>
    )

}

export default SortBy