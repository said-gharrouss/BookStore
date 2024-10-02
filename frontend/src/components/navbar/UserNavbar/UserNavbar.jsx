import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../Search/Search";
import UserLinks from "./UserLinks";
import UserPhoneLinks from "./UserPhoneLinks";

function UserNavbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [searchBar,setSearchBar] = useState(false);
    const handleNavbar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <nav className={`fixed w-full bg-white transition-[all_0.3s] top-0 left-0 shadow-md z-[200]
            `}>
                <div className="hidden md:block">
                    <UserLinks setSearchBar={setSearchBar}/>
                </div>
                <div className="md:hidden flex gap-[15px] items-center bg-white">
                    <UserPhoneLinks handleNavbar={handleNavbar} isOpen={isOpen}/>
                    <div className="min-h-[50px] flex justify-between items-center w-full px-[20px] ">
                        <Link to={"/user"} className="text-[25px] font-bold text-primary">H books</Link>

                        <div className="flex gap-[20px] items-center">
                            <span className="cursor-pointer links-hover" onClick={() => setSearchBar(prevState => !prevState)}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <span className="text-[20px] cursor-pointer" onClick={() => handleNavbar()}>
                                <i className="fa-solid fa-bars"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <Search isOpen={searchBar} setIsSearchBarOpen={setSearchBar}/>
        </nav>
        )
}

export default UserNavbar
