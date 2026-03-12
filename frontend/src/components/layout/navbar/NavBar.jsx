import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"
import NavLinks from "./NavLinks"
import UserMenu from "./UserMenu"

function NavBar({ setLogin, setSignup }) {
    
    return (
        <>
            <div className="sticky top-0 shadow-[0px_0px_10px_black] z-10 bg-neutral-800 h-14 items-center flex justify-between px-4 text-white gap-5">
                <Logo />
                <SearchBar />
                <div className="flex h-full items-center gap-5">
                    <ThemeToggle />
                    <NavLinks setLogin={setLogin} setSignup={setSignup} />
                    <UserMenu />
                </div>
            </div>
        </>
    )

}

export default NavBar