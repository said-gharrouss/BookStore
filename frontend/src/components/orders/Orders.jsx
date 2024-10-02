import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderApi } from "../../api/orderApi";
import { Link } from "react-router-dom";
import OrdersSkeleton from "./OrdersSkeleton";

function Orders() {
    const localOrders = localStorage.getItem("myOrders") ? JSON.parse(localStorage.getItem("myOrders")) : [];
    const [myOrders,setMyOrders] = useState(localOrders);
    const user = useSelector((state) => state.user.infos);

    useEffect(() => {
        orderApi.getOrders()
        .then((response) => {
            if(response.status === 200){
                let orders = response.data.filter(order => order.user_id == user?.id);
                orders = orders.reverse();
                localStorage.setItem("myOrders",JSON.stringify(orders))
                setMyOrders(orders);
            }
        }).catch((error) => {
            console.log(error);
        } )
    },[user,myOrders]);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

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



    return (
        <div className="container mx-auto  min-h-[100vh] pt-[90px] px-[20px]">
            <h2 className="font-bold text-[30px] title-style">Orders</h2>
            <div className="overflow-x-auto mt-[30px]">
            {
            myOrders.length > 0 ?
            <table className="w-[80%] divide-y-2 divide-gray-300 bg-backgroundLight text-sm rounded-[4px] mx-auto">
                <thead className="ltr:text-left rtl:text-right ">
                <tr>
                    <th className="whitespace-nowrap px-4 py-4 font-bold ">Order Number</th>
                    <th className="whitespace-nowrap px-4 py-4 font-bold ">Total Price</th>
                    <th className="whitespace-nowrap px-4 py-4 font-bold ">Books</th>
                    <th className="whitespace-nowrap px-4 py-4 font-bold ">Date</th>
                    <th className="whitespace-nowrap px-4 py-4 font-bold ">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                    {
                        myOrders?.map((order,key) => (
                            <tr key={myOrders.length - key}>
                                <td className="whitespace-nowrap px-4 py-3 text-center">{myOrders.length - key}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">${order.total_price}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">{order.items.length} book(s)</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">{formatDate(order.created_at)}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-center">
                                    <Link to={`/user/myorderdetails/${order.id}`}>
                                        <button className="text-white bg-primary font-bold py-[2px] w-[50px] mr-[6px] rounded-[4px]">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            : <OrdersSkeleton/>
            }
            </div>
        </div>
    )
}

export default Orders
