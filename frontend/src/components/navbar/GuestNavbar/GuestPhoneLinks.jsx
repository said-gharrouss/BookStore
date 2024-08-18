import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function GuestPhoneLinks({handleNavbar,isOpen}) {
    return (
        <>
        <ul className={`flex gap-[15px] text-[20px] flex-col absolute  right-0 w-full z-[20] bg-white
        text-center pt-[40px] pb-[20px] transition-[0.3s]  shadow-lg ${isOpen ? "top-0" : "hide-nav"}`}>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <a href="#home" onClick={() => handleNavbar()}>Home</a>
            </li>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <Link to={`/favoritebooks`} onClick={() => handleNavbar()}>Favorite books</Link>
            </li>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <a href="#reviews" onClick={() => handleNavbar()}>Review</a>
            </li>
            <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                <a href="#contact" onClick={() => handleNavbar()}>Contact</a>
            </li>
                <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                    <Link to={"/login"}>Login</Link>
                </li>
                <li className="hover:text-primary hover:bg-gray-100 py-[8px] transition-[0.3s] ">
                    <Link to={"/signup"}>Sign up</Link>
                </li>
            <button className="absolute z-[21] top-[15px] right-[20px] w-[30px] h-[30px] bg-red-500 text-white
            rounded-[50%] text-[14px]" onClick={() => handleNavbar()}>X</button>
        </ul>
        </>
    )
}

GuestPhoneLinks.propTypes = {
    handleNavbar : PropTypes.func.isRequired,
    isOpen : PropTypes.bool.isRequired
}

export default GuestPhoneLinks
