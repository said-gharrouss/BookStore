import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Logout from "../../Logout/Logout";
import PropTypes from 'prop-types';

function UserLinks({setSearchBar}) {
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const [isUlDsp,setIsUlDsp] = useState(false);
    const userFromState = useSelector(state => state.user.infos);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :  userFromState;
    const orderNumber = shopingCart.reduce((acc,currentValue) => {
        return acc + parseInt(currentValue.quantity);
    },0)
    return (
        <div className={`container mx-auto h-[150px] sm:h-[60px] pb-[15px] sm:pb-[0px] flex flex-col sm:flex-row justify-between items-center
            relative`}>
            <Link to={"/user"} className="text-[25px] font-bold text-primary mb-[10px] sm:mb-0">H books</Link>
            <ul className="flex gap-[20px] items-center mb-[15px] sm:mb-0">
                <li>
                    <Link to={"/user"} className="links-hover">
                    Home
                    </Link>
                </li>
                <li>
                    <a href="#reviews"
                    className="links-hover cursor-pointer">
                    Reviews
                    </a>
                </li>
                <li>
                    <a href="#contact"
                    className="links-hover cursor-pointer">
                    Contact
                    </a>
                </li>
            </ul>

            <ul className="flex gap-[22px] items-center">
                <li>
                    <span className="cursor-pointer links-hover" onClick={() => setSearchBar(prevState => !prevState)}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </li>
                <li>
                    <Link to={`/user/favoritebooks`} className="links-hover"><i className="fa-regular fa-heart"></i></Link>
                </li>
                <li className="relative">
                    <Link to={`/user/shopingCart`} className="links-hover">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {
                            shopingCart.length >= 1 &&
                            <span className="text-white bg-red-500 w-[15px] h-[15px] rounded-[50%]
                            text-[12px] flex justify-center items-center absolute bottom-[-2px] left-[10px]">{orderNumber}</span>
                        }
                    </Link>
                </li>
                <li className="relative">
                    <div className="bg-primary text-white min-w-[120px] h-[30px]
                    flex justify-between gap-[10px] items-center rounded-[4px] px-[10px] cursor-pointer"
                    onClick={() => setIsUlDsp(prevState => !prevState)}>
                        <div className="font-bold flex  gap-[10px]">
                            <span className="text-[14px] self-center">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <span>
                                {user?.name}
                            </span>
                        </div>
                        <span  className={`${!isUlDsp ? "filters_icon_unclicked" : "filters_icon_clicked"} transition-[0.3s]`}>
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                    </div>
                    {
                        isUlDsp &&
                        <ul className="absolute bg-white w-full border-[1px] border-primary_black mt-[5px] overflow-hidden
                        rounded-[4px] text-[14px]">
                            <Link to={"/user/profile"} onClick={() => setIsUlDsp(false)}>
                            <li className="hover:bg-gray-100 cursor-pointer px-[10px] py-[7px] flex items-center gap-[10px]">
                                <span>
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <span> My Profile </span>
                            </li>
                            </Link>
                            <Link to={"/user/orders"} onClick={() => setIsUlDsp(false)}>
                                <li className="hover:bg-gray-100 cursor-pointer px-[10px] py-[7px] flex items-center gap-[10px]">
                                    <span>
                                        <i className="fa-solid fa-clipboard-list"></i>
                                    </span>
                                    <span>
                                        My Orders
                                    </span>
                                </li>
                            </Link>
                            <li className="hover:bg-gray-100 cursor-pointer  px-[10px] py-[7px]">
                                <Logout/>
                            </li>
                        </ul>
                    }
                </li>
            </ul>
        </div>
    )
}

UserLinks.propTypes = {
    setSearchBar : PropTypes.func.isRequired,
}

export default UserLinks
