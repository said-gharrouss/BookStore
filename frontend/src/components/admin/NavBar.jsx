import { useState } from "react";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';


function NavBar({toggleSideBar,isSideBarVisible}) {
    const [isOpen,setIsOpen] = useState(false);
    const userFromState = useSelector(state => state.user.infos) ;
    console.log(userFromState);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : userFromState;

    return (
        <div className="bg-white w-full flex items-center justify-between py-[15px] relative z-[2] px-[20px] shadow-md">
        <div className="flex items-center gap-[20px]">
            {
                !isSideBarVisible &&
                <button className="text-[22px]" onClick={() => toggleSideBar()}>
                    <i className="fas fa-columns"></i>
                </button>
            }
            <h2 className="text-primary font-bold text-[22px]">H books</h2>
        </div>
        <div className="relative">
            <div className="bg-primary text-white w-fit h-[30px]
            flex justify-between gap-[10px] items-center rounded-[4px] px-[10px] cursor-pointer"
            onClick={() => setIsOpen(prevState => !prevState)}>
                <div className="font-bold flex gap-[10px]">
                    <span>
                        <i className="fa-solid fa-user-tie"></i>
                    </span>
                    <span>
                        {user?.name}
                    </span>
                </div>
                <span  className={`${!isOpen ? "filters_icon_unclicked" : "filters_icon_clicked"} transition-[0.3s]`}>
                    <i className="fa-solid fa-angle-down"></i>
                </span>
            </div>
            {
                isOpen &&
                <div className="absolute bg-white w-full mt-[5px] border-[1px]
                    border-primary_black pl-[10px] h-[30px] rounded-[4px] hover:bg-gray-100
                    cursor-pointer">
                        <Logout/>
                </div>
            }
        </div>
    </div>
    )
}

NavBar.propTypes = {
    toggleSideBar : PropTypes.func.isRequired,
    isSideBarVisible : PropTypes.bool.isRequired,
}

export default NavBar
