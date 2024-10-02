import { Link } from "react-router-dom"
import Logout from "../../Logout/Logout"
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from "react-redux";


function UserPhoneLinks({handleNavbar,isOpen}) {
    const [currentPage,setCurrentPage] = useState("home");
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const orderNumber = shopingCart.reduce((acc,currentValue) =>{
        return acc + parseInt(currentValue.quantity);
    },0)


    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
        <ul className={`flex gap-[15px] text-[20px] flex-col absolute  right-0 w-full z-[20] bg-white
        text-center pt-[40px] pb-[20px] transition-[0.3s]  shadow-lg ${isOpen ? "top-0" : "hide-nav"}`}>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <a href="#reviews" onClick={() => handleNavbar()}>Review</a>
            </li>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <a href="#contact" onClick={() => handleNavbar()}>Contact</a>
            </li>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] flex justify-center">
                <Logout/>
            </li>
            <button className="absolute z-[21] top-[15px] right-[20px] w-[30px] h-[30px] bg-red-500 text-white
            rounded-[50%] text-[14px]" onClick={() => handleNavbar()}>X</button>
        </ul>
        <ul className="fixed bottom-0 left-0 bg-white w-full flex border-t-[2px] border-gray-300">
            <Link to={"/user"} className={`py-[10px]  flex-1 hover:bg-gray-200 transition-[0.3s] text-center ${currentPage === "home" && "bg-gray-200"}`} onClick={() => handleCurrentPage("home")}>
                <li>
                    <i className="fa-solid fa-house"></i>
                </li>
            </Link>
            <Link to={`/user/shopingcart`} className={`py-[10px]  flex-1 hover:bg-gray-200 transition-[0.3s] relative text-center ${currentPage === "cart" && "bg-gray-200"}`} onClick={() => handleCurrentPage("cart")}>
                <li>
                    <i className="fa-solid fa-cart-shopping"></i>
                {
                    shopingCart.length >= 1 &&
                    <span className="text-[12px] bg-red-500 text-white rounded-[50%] absolute w-[15px] h-[15px] bottom-[8px] right-[21px]">{orderNumber}</span>
                }
                </li>
            </Link>
            <Link to={`/user/favoritebooks`} className={`py-[10px]  flex-1 hover:bg-gray-200 transition-[0.3s] text-center ${currentPage === "favorite" && "bg-gray-200"}`} onClick={() => handleCurrentPage("favorite")}>
                <li>
                    <i className="fa-regular fa-heart"></i>
                </li>
            </Link>
            <Link to={`/user/orders`} className={`py-[10px]  flex-1 hover:bg-gray-200 transition-[0.3s] text-center ${currentPage === "orders" && "bg-gray-200"}`} onClick={() => handleCurrentPage("orders")}>
                <li>
                    <i className="fa-solid fa-clipboard-list"></i>
                </li>
            </Link>
            <Link to={`/user/profile`} className={`py-[10px]  flex-1 hover:bg-gray-200 transition-[0.3s] text-center ${currentPage === "profile" && "bg-gray-200"}`} onClick={() => handleCurrentPage("profile")}>
                <li>
                    <i className="fa-solid fa-user"></i>
                </li>
            </Link>

        </ul>
        </>
    )
}

UserPhoneLinks.propTypes = {
    handleNavbar : PropTypes.func.isRequired,
    isOpen : PropTypes.bool.isRequired
}
export default UserPhoneLinks
