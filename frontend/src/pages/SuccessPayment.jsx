import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { USER_HOME } from "../router/Index";
import { useEffect } from "react";
import { handleClearBooks } from "../Redux/feauters/shopcartbooksSlice";

function SuccessPayment() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleClearBooks());
        localStorage.setItem("shopingCart",[]);
    },[dispatch]);
    return (
        <div className="bg-[#f1f5f9] w-[100vw] h-[100vh] fixed top-0 left-0">
            <div className="w-[70%] sm:w-[40%] mx-auto py-[30px] flex flex-col items-center mt-[50px] gap-[5px] bg-white">
                <div className="text-green-600 text-[60px]">
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <p className="text-[30px] font-bold">Payment Done !</p>
                <p className="text-[14px] text-gray-500 font-semibold text-center">Thank you for completing your secure online payment.</p>
                <span className="text-gray-500 font-bold">Have a great day !</span>
                <Link to={user.isAuthenticated ? USER_HOME : "/" }>
                    <button className="bg-primary px-[50px] py-[8px] uppercase text-white mt-[30px] font-bold
                    hover:text-primary hover:bg-[#f1f5f9] hover:shadow-md transition-[0.3s]">Go back</button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessPayment
