import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom";
import { USER_HOME } from "../router/Index";
import { useEffect, useState } from "react";
import { handleClearBooks } from "../Redux/feauters/shopcartbooksSlice";
import { axiosClient } from "../api/axios";
import { orderApi } from "../api/orderApi";

function SuccessPayment() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const books = useSelector(state => state.shopingCart.books);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
        axiosClient.post('/stripe/payment-status', { sessionId })
            .then((response) => {
                setPaymentStatus(response.data.payment_status);
            })
            .catch((error) => {
            console.error('Error fetching payment status:', error);
            });
        }
    }, [location.search,paymentStatus]);



    const insertOrder = async () => {
        const total_price = books.reduce((acc,currentValue) =>{
            return acc + parseFloat((currentValue.item.price) * parseInt(currentValue.quantity));
        },0);
        const user_id = user.infos.id;
        let items = [];
        books.map((e) => {
            items = [...items,
                {
                    book_id : e.item.id,
                    quantity : e.quantity,
                    price : e.item.price,
            }]
        });
        const data = {
            user_id,
            total_price,
            items,
        }
        if(paymentStatus === "paid"){
            try{
                const response = await orderApi.insertOrder(data)
                if(response.status === 200){
                    dispatch(handleClearBooks());
                    localStorage.setItem("shopingCart",[]);
                }
            } catch(error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
        insertOrder();
    },[paymentStatus]);







    if(!paymentStatus){
        return (
            <div className="bg-backgroundLight w-[100vw] h-[100vh] flex justify-center items-center text-[50px]">
                Loading ...
            </div>
        )
    }


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
                    border-[1px] hover:text-primary hover:border-primary hover:bg-white rounded-[4px] transition-[0.3s]">Go back</button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessPayment
