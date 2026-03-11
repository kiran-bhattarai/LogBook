
function SortBy({sortId, setSortId}) {

    return (
        <div className="p-2 rounded">
            <label htmlFor="sort" className="text-white text-xl" >Sort by: &nbsp;</label>
            <select value={sortId} name="" id="sort" className="text-white text-lg bg-neutral-900 outline-none" onChange={(e) => setSortId(parseInt(e.target.value))}>
                <option value="1">Date (Newest first)</option>
                <option value="2">Date (Oldest first)</option>
                <option value="3">Alphabetical</option>
                <option value="4">Alphabetical reverse</option>
                <option value="5">Characters (Most first)</option>
                <option value="6">Characters (Least first)</option>
            </select>
        </div>
    )

}

export default SortBy