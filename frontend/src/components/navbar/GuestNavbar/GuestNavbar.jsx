import { Link } from "react-router-dom"
import {useSelector} from 'react-redux';
import { useState } from "react";
import GuestLinks from "./GuestLinks";
import Search from "../../Search/Search";
import GuestPhoneLinks from "./GuestPhoneLinks";

function GuestNavbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [searchBar,setSearchBar] = useState(false);
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const orderNumber = shopingCart.reduce((acc,currentValue) =>{
        return acc + parseInt(currentValue.quantity);
    },0)
    const handleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className={`fixed w-full bg-white transition-[all_0.3s] top-0 left-0 shadow-md z-[200]
            `}>
                <div className="hidden md:block">
                    <GuestLinks setSearchBar={setSearchBar}/>
                </div>
                <div className="md:hidden flex gap-[15px] items-center bg-white">
                    <GuestPhoneLinks handleNavbar={handleNavbar} isOpen={isOpen}/>
                    <div className="min-h-[50px] flex justify-between items-center w-full px-[20px] ">
                        <Link to={"/"} className="text-[25px] font-bold text-primary">H books</Link>

                        <div className="flex gap-[20px] items-center">
                            <span className="cursor-pointer links-hover" onClick={() => setSearchBar(prevState => !prevState)}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <div className="relative">
                                <Link to={`/shopingCart`} className="links-hover text-[18px]">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    {
                                        shopingCart.length >= 1 &&
                                        <span className="text-white bg-red-500 w-[15px] h-[15px] rounded-[50%]
                                        text-[12px] flex justify-center items-center absolute bottom-[-2px] left-[10px]">{orderNumber}</span>
                                    }
                                </Link>
                            </div>
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

export default GuestNavbar
