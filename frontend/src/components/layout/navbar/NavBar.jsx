import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"
import NavLinks from "./NavLinks"
import UserMenu from "./UserMenu"

function NavBar({ setLogin, setSignup }) {

    return (
        <>
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-black text-black dark:text-white shadow-[0px_0px_4px_1px] shadow-[#575757] dark:shadow-neutral-400 h-14 items-center flex justify-center">
                <div className="max-w-7xl justify-self-center w-400 items-center flex justify-between py-1 2xl:py-2 sm:px-3 px-1.5 gap-1">
                    <Logo />
                    <SearchBar />
                    <div className="flex h-full items-center gap-3 relative">
                        <ThemeToggle />
                        <NavLinks setLogin={setLogin} setSignup={setSignup} />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </>
    )

}

export default NavBar