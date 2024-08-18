import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function GuestLinks({setSearchBar}) {
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const orderNumber = shopingCart.reduce((acc,currentValue) =>{
        return acc + parseInt(currentValue.quantity);
    },0)


    return (
        <div className={`container mx-auto h-[150px] sm:h-[60px] pb-[15px] sm:pb-[0px] flex flex-col sm:flex-row justify-between items-center
            relative`}>
            <Link to={"/"} className="text-[25px] font-bold text-primary mb-[10px] sm:mb-0">H books</Link>
            <ul className="flex gap-[20px] items-center mb-[15px] sm:mb-0">
                <li>
                    <Link to={"/"} className="links-hover">
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
                    <Link to={`/favoritebooks`} className="links-hover"><i className="fa-regular fa-heart"></i></Link>
                </li>
                <li className="relative">
                    <Link to={`/shopingCart`} className="links-hover">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {
                            shopingCart.length >= 1 &&
                            <span className="text-white bg-red-500 w-[15px] h-[15px] rounded-[50%]
                            text-[12px] flex justify-center items-center absolute bottom-[-2px] left-[10px]">{orderNumber}</span>
                        }
                    </Link>
                </li>
                <li>
                    <Link to={"/login"} className="rounded-[4px]  text-center block bg-lightwhite w-[80px] h-[30px]">Login</Link>
                </li>
                <li>
                    <Link to={"/signup"} className="text-white rounded-[4px] text-center block bg-primary w-[80px] h-[30px]">Sign up</Link>
                </li>
            </ul>
        </div>
    )
}

GuestLinks.propTypes = {
    setSearchBar : PropTypes.func.isRequired,
}

export default GuestLinks
