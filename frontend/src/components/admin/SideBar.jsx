import { Link } from "react-router-dom"
import { ADMIN_HOME } from "../../router/Index"
import { useState } from "react";
import PropTypes from 'prop-types';


function SideBar({toggleSideBar,isSideBarVisible}) {
    const [activeMenuItem,setCurrentUrl] = useState("books");
    return (
        <div className={`${isSideBarVisible ? "sidebar-visible" : "sidebar-hidden"} w-[60px] sm:w-[100px] md:w-[200px] px-[20px] fixed top-0 left-0 h-[100%]
        transition-[0.5s] shadow-lg z-[3] bg-white`}>
            <button className="text-[22px] mt-[8px] " onClick={() => toggleSideBar()}>
                <i className="fas fa-columns"></i>
            </button>
            <ul className={`text-[15px]`}>
                <Link to={ADMIN_HOME}>
                    <li className={`${activeMenuItem === "books" && "bg-[#f1f5f9]"} py-[6px] hover:bg-[#f1f5f9] transition-[0.3s]
                    cursor-pointer rounded-[4px] mt-[20px] px-[5px] md:px-[10px]`} onClick={() => setCurrentUrl("books")}>
                        <span className="md:mr-[10px] flex justify-center md:inline">
                            <i className="fa-solid fa-book"></i>
                        </span>
                        <span className="hidden md:inline">All Books</span>
                    </li>
                </Link>
                <Link to={"/admin/addbook"}>
                    <li className={`${activeMenuItem === "addbook" && "bg-[#f1f5f9]"} py-[6px] hover:bg-[#f1f5f9] hover:text-primary_black transition-[0.3s]
                    cursor-pointer rounded-[4px] my-[10px] px-[5px] md:px-[10px]`}  onClick={() => setCurrentUrl("addbook")}>
                        <span className="md:mr-[10px] flex justify-center md:inline">
                            <i className="fa-regular fa-square-plus"></i>
                        </span>
                        <span className="hidden md:inline">Add Book</span>
                    </li>
                </Link>
                <Link to={"/admin/orderrecords"}>
                    <li className={`${activeMenuItem === "orderrecords" && "bg-[#f1f5f9]"} py-[6px] hover:bg-[#f1f5f9] hover:text-primary_black transition-[0.3s]
                    cursor-pointer rounded-[4px] my-[10px] px-[5px] md:px-[10px]`}  onClick={() => setCurrentUrl("orderrecords")}>
                        <span className="md:mr-[10px] flex justify-center md:inline">
                            <i className="fa-solid fa-file-invoice-dollar"></i>
                        </span>
                        <span className="hidden md:inline">Order Records</span>
                    </li>
                </Link>
            </ul>
        </div>
    )
}

SideBar.propTypes = {
    toggleSideBar : PropTypes.func.isRequired ,
    isSideBarVisible : PropTypes.bool.isRequired,
}

export default SideBar
