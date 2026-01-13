
function SortBy() {

    return (
        <div className="p-2 rounded">
            <label htmlFor="sort" className="text-white text-xl" >Sort by: &nbsp;</label>
            <select name="" id="sort" className="text-white text-lg bg-neutral-900 outline-none">
                <option value="dateNew">Date (Newest first)</option>
                <option value="">Date (Oldest first)</option>
                <option value="">Alphabetical</option>
                <option value="">Alphabetical reverse</option>
                <option value="">Characters (Most first)</option>
                <option value="">Characters (Least first)</option>
            </select>
        </div>
    )

}

export default SortBy