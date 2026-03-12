import { useState, createContext, useContext } from "react"

const NavSearchContext = createContext(null)

function NavSearchProvider({ children }) {

    
    const [searchValue, setSearchValue] = useState("")

    return (
        <NavSearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </NavSearchContext.Provider>
    )
}

export default NavSearchProvider

export const useNavSearch = () => useContext(NavSearchContext)