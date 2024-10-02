import { useEffect, useState } from "react"
import { axiosClient } from "../../../api/axios";
import { Link } from "react-router-dom";
import { orderApi } from "../../../api/orderApi";
import OrderListSkeleton from "./OrderListSkeleton";

function OrderRecords() {
    const localOrders = localStorage.getItem("orderList") ? JSON.parse(localStorage.getItem("orderList")) : [];
    const [orderList,setOderList] = useState(localOrders);
    const [activeOrderIndex,setActiveOrderIndex] = useState(null);
    const orderStatusOptions = ["pending","shipped","delivered"];
    const [loadingState,setLoadingState] = useState({id:null,state:false});

    const [currentPage,setCurrentPage] = useState(1);
    const avaliableOrdersNm = 10;
    const lastIndex = currentPage * avaliableOrdersNm;
    const firstIndex = lastIndex - avaliableOrdersNm;
    const currentOrders = orderList?.slice(firstIndex,lastIndex);
    const pagesNumber = Math.ceil(orderList?.length / avaliableOrdersNm);
    const numbers = [...Array(pagesNumber).keys()];



    useEffect(() => {
        axiosClient.get("/api/order")
        .then((response) => {
            if(response.status === 200){
                let orders = response.data.reverse();
                localStorage.setItem("orderList",JSON.stringify(orders));
                setOderList(orders);
            }
            console.log(response);
        }).catch((error) => {
            console.log(error);
        } )
    },[orderList]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour : 'numeric',
        minute : '2-digit',
        second : "2-digit"
        });
    };

    const toggleOrderStatus = (e) => {
        setActiveOrderIndex(prevState => prevState === null ? e : null);
    }

    const updateOrderStatus = async (status,id) => {
        setLoadingState({id:id,state:true});
        try {
            const response = await orderApi.updateOrder(id,status);
            if(response.status === 200){
                setLoadingState({id:id,state:false});
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNextPage = () => {
        if(currentPage !== pagesNumber){
            setCurrentPage(prev => prev +1);
        }
    }

    const handlePrevPage = () => {
        if(currentPage !== 1){
            setCurrentPage(prev => prev -= 1);
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);



    return (
        <div className="px-[20px] mx-auto mt-[20px] min-h-[100vh]">
            <h2 className="admin-title">Order Records</h2>
            <div className="overflow-x-auto mt-[30px]">
            {
                currentOrders.length > 0 ?
                <table className="w-full bg-white divide-y-2 divide-gray-200  text-sm rounded-[4px]">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-4 font-bold ">Order Number</th>
                        <th className="whitespace-nowrap px-4 py-4 font-bold ">Order Status</th>
                        <th className="whitespace-nowrap px-4 py-4 font-bold ">Total Price</th>
                        <th className="whitespace-nowrap px-4 py-4 font-bold ">Date</th>
                        <th className="whitespace-nowrap px-4 py-4 font-bold ">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    {
                        currentOrders?.map((order,key) => (
                            <tr key={key}>
                                <td className="whitespace-nowrap px-4 py-3 text-center">{order.id - 31}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center flex justify-center">
                                    <div className="w-[80px] relative">
                                        {
                                            loadingState.id == order.id ?
                                            !loadingState.state ?
                                            <button className={`text-white font-bold py-[2px] w-full rounded-[4px]
                                            ${order.status === "pending" && "bg-orange-500"} ${order.status === "shipped" && "bg-blue-500"}
                                            ${order.status === "delivered" && "bg-green-500"}`}
                                            onClick={() => toggleOrderStatus(key)}>
                                                {order.status}
                                            </button>
                                            :
                                            <button className="text-[14px]">
                                                Loading ...
                                            </button>
                                            :
                                            <button className={`text-white font-bold py-[2px] w-full rounded-[4px]
                                                ${order.status === "pending" && "bg-orange-500"} ${order.status === "shipped" && "bg-blue-500"}
                                                ${order.status === "delivered" && "bg-green-500"}`}
                                                onClick={() => toggleOrderStatus(key)}>
                                                    {order.status}
                                            </button>
                                        }
                                        {
                                            key === activeOrderIndex &&
                                            <ul className="bg-white absolute top-[26px] left-0 w-full z-[2] rounded-[4px] border-[1px] border-primary_black overflow-hidden">
                                                {
                                                    orderStatusOptions.map((option,key) => {
                                                        if(option !== order.status){
                                                            return (<li key={key} className="py-[2px] hover:bg-gray-100 transition-[0.3s] cursor-pointer"
                                                            onClick={
                                                                () => {
                                                                    updateOrderStatus(option,order.id);
                                                                    toggleOrderStatus(null);
                                                                }
                                                            } >{option}</li>)
                                                        }
                                                    })
                                                }
                                            </ul>
                                        }
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">${order.total_price}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">{formatDate(order.created_at)}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">
                                    <Link to={`/admin/orderdetails/${order.id}`}>
                                        <button className="text-white bg-primary font-bold py-[2px] w-[50px] rounded-[4px]">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table> : <OrderListSkeleton/>
            }
            </div>
            {
                currentOrders.length > 0 &&
                <div className="flex bg-white items-center gap-[5px] py-[30px] sm:py-[20px] pr-[50px] sm:pr-[20px] justify-end text-[14px]  border-t-[1px] border-gray-200">
                    <button className="w-[23px] h-[23px] border-[1px] border-gray-400 rounded-[6px] bg-white hover:border-[1.4px] transition-[0.3s]"><i className="fa-solid fa-angle-left"
                    onClick={() => handlePrevPage()}></i></button>
                    <ul className="flex items-center gap-[5px]">
                        {numbers?.map((e,key) => {
                            return (
                                <li key={key} className={`${e + 1 === currentPage ? "bg-primary text-white" : "border-[1px] border-gray-400 hover:border-[1.4px]"} font-semibold w-[23px] h-[23px] rounded-[6px]
                                flex justify-center items-center  cursor-pointer  transition-[0.3s]`} onClick={() => setCurrentPage(e + 1)}>{e + 1}</li>
                            )
                        })}
                    </ul>
                    <button className="w-[23px] h-[23px] border-[1px] border-gray-400 rounded-[6px] bg-white hover:border-[1.4px] transition-[0.3s]"
                    onClick={()=> handleNextPage()}><i className="fa-solid fa-angle-right"></i></button>
                </div>
            }
        </div>
    )
}

export default OrderRecords
